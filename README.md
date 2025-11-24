🌟 Zypher Research & Notes Agent (Groq + Zypher Framework)

This project is a CLI-based AI Agent built using the Zypher Agent Framework and powered by Groq’s Llama 3.3 70B model.
It takes any topic from the command line, generates structured Markdown notes, and saves them automatically into a notes/ folder.

This project is submitted as part of the CoreSpeed Zypher Assessment.

📁 Project Features
✅ Command-line topic input

Pass any topic when running the agent.

✅ Streaming LLM output

See the model generate markdown live in your terminal.

✅ Markdown notes generation

Output is saved automatically as:

notes/<topic-slug>.md

✅ Powered by Groq (FREE)

No Anthropic credits required.

✅ Clean, simple TypeScript implementation

Uses Deno + Zypher + Groq.

🧱 Tech Stack

Deno

TypeScript

Zypher Framework

Groq Llama 3.3 70B (OpenAI-compatible)

rxjs-for-await

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/KomalSai1/zypher-research-notes-agent.git
cd zypher-research-notes-agent

2. Install dependencies
deno add jsr:@corespeed/zypher
deno add npm:rxjs-for-await

3. Create a .env file

Add this inside:

GROQ_API_KEY=your_groq_api_key_here


Get your free key from:
👉 https://console.groq.com/keys

⚠️ Your .env is ignored by Git and should never be uploaded.

4. (Windows only) Set HOME before running

Zypher requires HOME to be set on Windows:

$env:HOME = "C:\Users\<your-username>"


Replace <your-username> with your actual Windows username.

▶️ Run the Agent
Default topic:
deno task start

Custom topic:
deno task start "Machine learning basics"

Output:

Live streaming markdown

Notes saved to:

notes/machine-learning-basics.md

📂 Project Structure
zypher-research-notes-agent/
│
├── main.ts            # Core agent logic
├── deno.json          # Imports + run task
├── README.md          # Documentation
├── .gitignore         # Prevents .env from being committed
└── notes/             # Generated markdown files


