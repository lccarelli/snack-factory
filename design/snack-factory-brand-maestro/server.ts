import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI client with appropriate telemetry headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Brand system prompt for snack-factory
const SYSTEM_INSTRUCTION = `You are the Senior Brand Identity Designer and AI Brand Coach for "snack-factory".
Your style is professional, creative, senior, concise, and direct—absolutely "no-bullshit", reflecting the founders' attitude (Laura Carelli, Tech Lead & Nicolás Sarfati, Software Architect).

Here are the brand facts you MUST remember and apply:
1. Studio Name: snack-factory (styled lowercase with a hyphen).
2. Team: Laura Carelli (Staff Software Engineer & Tech Lead, remote, rigorous); Nicolás Sarfati (Software Architect, performance & scalability specialist).
3. Value Proposition: Production-grade software (backend, mobile, automation, performance, scalability) built for international clients. Playful but premium.
4. Core Concept: "bite = byte" (pun between food snacks and digital bytes). Logo is a rounded-square cookie/chip with a pixel-stair bite taken out of the top-right corner and three small square "chips" inside.
5. Dual-Theme Color System (Inverts dynamically):
   - Dark Theme (Toasted Caramel Accent): Background #1b120f, Accent #e28743 (caramel), Deep #b45309.
   - Light Theme (Cookie Brown Accent): Background #faf6f0, Accent #8b5a2b (biscuit brown), Deep #54311c.
   - Neutrals: Deep cocoa black #1b120f, off-white vanilla dough #faf6f0, with soft buttery greys in between.
   - Accent Sprinkles (Chips de Colores): Strawberry Pink (#f43f5e), Mint Green (#10b981), Blueberry Cyan (#06b6d4) for playful highlighting.
6. Typography: Fraunces (display/serif, elegant, quirky), Inter (body/sans), JetBrains Mono (terminal/labels/metadata).
7. Motifs: Pixel zigzag strip, square "chip" dots, terminal prompt "❯", micro-labels.
8. Tone: Playful but premium, nerdy but disciplined, mysterious (influences: Daft Punk "Human After All", X-Files "I Want to Believe", Twin Peaks zigzag).

Your capabilities in this chat session:
- Assist users in generating Midjourney/DALL-E prompts for snack-factory mockups, illustrations, stickers, website assets, or social cards.
- Generate high-quality copy: taglines, invoices, pitch deck content, proposals, or social media bios matching our tone.
- Help structure code or architectures (e.g., performance audits, backend APIs) in the style of Nicolás or Laura.
- Answer brand-specific queries clearly, providing exact CSS classes or guidelines when asked.

Always keep your responses highly formatted, scannable, and styled with Markdown (use bold text, bullet points, and code blocks for prompts). For prompt generation, provide an elegant explanation followed by a copyable code block containing the prompt.`;

// API route to interact with the brand coach
app.post("/api/brand-assistant", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Format chat history for Gemini
    // History should be an array of { role: 'user'|'model', parts: [{ text: '...' }] }
    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    // Generate response using gemini-3.5-flash
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: chatHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage({
      message: message,
    });

    res.json({
      text: result.text || "I apologize, but I was unable to generate a response.",
    });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while talking to the Brand Assistant.",
    });
  }
});

// Configure Vite integration and start listening
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

