# Zypher Research & Notes Agent (Groq)

This project is a simple CLI AI Agent built with the **Zypher framework** and powered by **Groq (Llama 3.3 70B)**.

The agent:
- Accepts a topic from the command line
- Uses Zypher + Groq to generate structured **Markdown notes**
- Saves the output into `notes/<topic-slug>.md`

---

## 🧱 Tech Stack

- Deno
- TypeScript
- [@corespeed/zypher](https://zypher.corespeed.io/)
- Groq Llama 3.3 70B (OpenAI-compatible API)

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/KomalSai1/zypher-research-notes-agent.git
cd zypher-research-notes-agent
