import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini
let genAIInstance: any = null;
function getGeminiAI() {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      try {
        genAIInstance = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      } catch (e) {
        console.log("GoogleGenAI init warning (fallback to offline modes)");
      }
    }
  }
  return genAIInstance;
}

// Immersive offline fallback quotes
const FALLBACK_QUOTES = [
  { text: "Warriors create, worriers hesitate. Be a warrior, not a worrier.", author: "Crucial Clutch Codex" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "You have the right to work, but for the work's sake only. You have no right to the fruits of work.", author: "Bhagavad Gita" },
  { text: "Victory belongs to the most persevering.", author: "Napoleon Bonaparte" },
  { text: "In the midst of chaos, there is also opportunity.", author: "Sun Tzu" },
  { text: "It is not death that a man should fear, but he should fear never beginning to live.", author: "Marcus Aurelius" },
  { text: "A warrior's soul is defined by the promises he makes to himself when no one is watching.", author: "Crucial Clutch" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "Better to die on one's feet than to live on one's knees.", author: "Emperor's Decree" }
];

// Offline fallback blunt motivational statements for missed self-respect
const FALLBACK_BLUNT_MOTIVATIONS = [
  "A warrior who cannot command himself is destined to bow to lesser rulers. Rise now and execute!",
  "Comfort is the silent executioner of kings. You traded your self-respect for momentary ease.",
  "You gave your word and crumbled at the first sign of fatigue. Do you possess the spirit of a vassal or a sovereign?",
  "Let this defeat burn in your chest. It is not the mountain we conquer, but ourselves.",
  "Every broken vow strips a layer of your armor. You stand exposed, not to enemies, but to your own weakness."
];

// Helper to sanitize excuse checking offline
function judgeExcuseOffline(excuse: string): { isValid: boolean; feedback: string; challenge: string } {
  const normalized = excuse.toLowerCase();
  const invalidKeywords = ["lazy", "tired", "sleep", "slept", "forgot", "forget", "bored", "game", "gaming", "netflix", "youtube", "tomorrow", "procrastinate", "procrastinated", "play", "phone", "chill"];
  
  const isInvalid = invalidKeywords.some(keyword => normalized.includes(keyword)) || excuse.length < 5;
  
  if (isInvalid) {
    const bluntMsg = FALLBACK_BLUNT_MOTIVATIONS[Math.floor(Math.random() * FALLBACK_BLUNT_MOTIVATIONS.length)];
    return {
      isValid: false,
      feedback: `${bluntMsg} Your reasons are hollow. They are the traits of a defeated civilian, not a conqueror.`,
      challenge: "Perform 10 physical repetitions (push-ups/squats) and enter combat mode to complete this task within exactly 3 hours!"
    };
  } else {
    return {
      isValid: true,
      feedback: "Your battle circumstances have been evaluated. Even commanders must regroup. The council permits a strategic retreat. Complete this vow within 1 day.",
      challenge: "Re-engage in 12 hours."
    };
  }
}

// API 1: Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// API 2: Organize Life Factors
app.post("/api/ai/organize-factors", async (req, res) => {
  const { preferences, list } = req.body;
  const aiClient = getGeminiAI();
  
  if (!aiClient) {
    // Return structured default ordered factor list
    const defaults = [...list];
    return res.json({
      orderedList: defaults,
      reasoning: "Generals order their battlefront based on tradition. (Gemini offline fallback: standard configuration applied)."
    });
  }

  try {
    const prompt = `You are the Grand AI Tactician of 'Crucial Clutch', a productivity battlefield application.
The user is prioritizing their life factors.
Here is the list of life factors they must organize: ${JSON.stringify(list)}.
Here is the user's optional context or custom preference: "${preferences || 'No manual instructions given.'}".

Organize the life factors from highest priority to lowest priority. Ensure you return a JSON object with two fields:
1. "orderedList": an array containing exactly the strings provided in the input list, ordered from most crucial to least crucial.
2. "reasoning": a short, epic, 2-sentence blunt warrior encouragement explaining why this priority arrangement was forged.

Strictly return only valid JSON matching this schema:
{
  "orderedList": [string...],
  "reasoning": string
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return res.json(parsed);
  } catch (error) {
    console.log("Gemini Factor Organization Error (using fallback). Spikes in demand are usually temporary.");
    return res.json({
      orderedList: list,
      reasoning: "The fog of war obscures the sky. Your custom arrangement remains steadfast as selected."
    });
  }
});

// API 3: Get Motivational Quote
app.post("/api/ai/get-quote", async (req, res) => {
  const { mood, taskTitle } = req.body;
  const aiClient = getGeminiAI();

  if (!aiClient) {
    const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return res.json({
      quote: randomQuote.text,
      author: randomQuote.author
    });
  }

  try {
    const prompt = `You are a legendary ancient general or philosopher (like Sun Tzu, Marcus Aurelius, Chanakya, or Lord Krishna) in the battle for productivity called 'Crucial Clutch'.
Generate a highly motivational, battle-ready wisdom quote.
Context: The current task to tackle is "${taskTitle || 'facing your duties'}".
Vibe: ${mood || "intense warrior focus"}.
Your output must be a JSON containing:
{
  "quote": "A single powerful ancient-sounding quote centered on duty, discipline, and completing tasks as if on a literal battlefield.",
  "author": "An appropriate legendary author or 'Ancient Sentinel'"
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return res.json(parsed);
  } catch (err) {
    const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return res.json({
      quote: randomQuote.text,
      author: randomQuote.author
    });
  }
});

// API 4: Evaluate excuse / verify excuse
app.post("/api/ai/verify-excuse", async (req, res) => {
  const { taskTitle, priority, excuse } = req.body;
  
  if (!excuse || excuse.trim() === "") {
    return res.json({
      isValid: false,
      feedback: "Silence. A warrior who gives no reason has already surrendered.",
      challenge: "Repent and complete the challenge right now!"
    });
  }

  const aiClient = getGeminiAI();
  if (!aiClient) {
    return res.json(judgeExcuseOffline(excuse));
  }

  try {
    const prompt = `You are the severe tactical commander of 'Crucial Clutch'. A user is explaining why they failed (Not Done) to complete their task: "${taskTitle}" of ${priority}% priority.
Their excuse is: "${excuse}".

Determine if this is a genuinely valid, unavoidable reason (like severe illness, physical emergency, sudden breakdown of critical tools, or direct danger) OR an invalid excuse (such as laziness, procrastination, sleeping in, gaming, losing momentum, mild distraction, or general excuses).

If it is an INVALID excuse (laziness, distracted, slept too much, etc.):
- "isValid" must be false.
- "feedback" must be a severe, bluntly honest, crushing ancient wisdom advice challenging their lack of discipline and questioning their self-respect. Mention their excuse and call out its weakness. Speak with high-impact warrior theatricality.
- "challenge" must be a micro-challenge given at this very moment (e.g. "Do 10 reps of a physical exercise, stare into the mirror, and solve the task in the next 3 hours!").

If it is a VALID excuse:
- "isValid" must be true.
- "feedback" must be a firm but honorable recognition of the unpredictable tide of war.
- "challenge" must suggest a strategic redirection, allowing them 1 day (24 hours) of breathing room.

Respond ONLY with a JSON object in this schema:
{
  "isValid": boolean,
  "feedback": "string",
  "challenge": "string"
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return res.json(parsed);
  } catch (error) {
    console.log("Gemini Verify Excuse Error (using offline judge fallback). Spikes in demand are usually temporary.");
    return res.json(judgeExcuseOffline(excuse));
  }
});

// Vite/Build middleware routing
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

  // Single-port container bind (Bind to port 3000 on 0.0.0.0)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Crucial Clutch full-stack server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
