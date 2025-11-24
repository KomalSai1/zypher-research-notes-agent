import {
    OpenAIModelProvider,
    createZypherContext,
    ZypherAgent,
  } from "@corespeed/zypher";
  import { eachValueFrom } from "rxjs-for-await";
  
  // Safely read environment variables
  function getRequiredEnv(name: string): string {
    const value = Deno.env.get(name);
    if (!value) {
      throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
  }
  
  // Turn a topic into a safe file name
  function slugify(input: string): string {
    return (
      input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "topic"
    );
  }
  
  async function main() {
    // 1. Topic from command line, or default
    const topicArg = Deno.args.join(" ").trim();
    const topic =
      topicArg.length > 0 ? topicArg : "Zypher Agent framework overview";
  
    const slug = slugify(topic);
    const notesPath = `notes/${slug}.md`;
  
    console.log(`🧠 Topic: ${topic}`);
    console.log(`📝 Notes file will be: ${notesPath}\n`);
  
    // 2. Zypher context (workspace)
    const context = await createZypherContext(Deno.cwd());
  
    // 3. Groq provider via OpenAIModelProvider
    const provider = new OpenAIModelProvider({
      openaiClientOptions: {
        apiKey: getRequiredEnv("GROQ_API_KEY"),
        baseURL: "https://api.groq.com/openai/v1",
      },
    });
  
    // 4. Create Zypher agent
    const agent = new ZypherAgent(context, provider);
  
    // 5. Task prompt for the agent
    const task = `
  You are a research and note-taking assistant.
  
  Write **markdown notes** about the topic: "${topic}".
  
  The markdown MUST follow this structure:
  
  # ${topic}
  ## Overview
  - Bullet points summarizing the topic.
  
  ## Key Points
  - 5–10 important bullet points.
  
  ## Practical Tips / Use Cases
  - Concrete, actionable items.
  
  ## References
  - If applicable, include a small list of links or sources.
  
  Write only valid markdown (no extra commentary).
  `;
  
    console.log("🚀 Running Zypher agent with Groq (Llama 3.3 70B)...\n");
  
    // 6. Run task using a Groq model
    const event$ = agent.runTask(task, "llama-3.3-70b-versatile");
  
    let markdownOutput = "";
  
    for await (const event of eachValueFrom(event$)) {
      if (event.type === "text") {
        // Stream text to terminal
        console.log(event.content);
        markdownOutput += event.content;
      }
    }
  
    // 7. Save markdown to notes/<topic>.md
    await Deno.mkdir("notes", { recursive: true });
    await Deno.writeTextFile(notesPath, markdownOutput);
  
    console.log(`\n✅ Done! Notes saved to: ${notesPath}`);
  }
  
  if (import.meta.main) {
    await main();
  }
  