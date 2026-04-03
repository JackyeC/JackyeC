import { JRC_DAILY_NOTE_PROMPT } from "../_shared/jrc-edit-prompt.ts";

const BANNED_PHRASES = [
  "text message from a mentor",
  "always in your corner",
  "as an ai",
  "i can't",
  "jrc edit",
  "here is",
];

const SANITIZE_PATTERNS = [
  /<think>/i,
  /jrc\s*edit/i,
  /\bdraft\b/i,
  /^here is/i,
  /system prompt/i,
  /assistant:/i,
];

function sanitizeNote(note: string): string {
  return note
    .split("\n")
    .filter((line) => !SANITIZE_PATTERNS.some((pattern) => pattern.test(line.trim())))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function validateNote(note: string): boolean {
  const words = note.split(/\s+/).filter(Boolean);
  if (words.length > 120) return false;

  const lowered = note.toLowerCase();
  if (BANNED_PHRASES.some((phrase) => lowered.includes(phrase))) return false;

  const lines = note.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length === 0) return false;

  return lines[lines.length - 1].trim().endsWith("?");
}

function generateTemplateNote(seed = new Date().getUTCDate()): string {
  const options = [
    "Hiring velocity is climbing in your space, but role clarity is lagging behind. That gap creates misfires that look like performance issues later. Tighten one role scorecard today and align success metrics before interviews start. Which open role will you recalibrate first to prevent avoidable churn?",
    "Your values emphasize inclusion, but your current messaging leans broad instead of role-specific. When positioning is vague, the best candidates self-select out. Rewrite one outbound message with explicit outcomes, decision scope, and growth path. Where can you make the value proposition sharper before the next outreach block?",
    "Industry noise is pushing reactive decisions, yet your edge comes from deliberate sequencing. Fast moves without prioritization will dilute team focus this week. Choose one strategic initiative to pause so the highest-leverage work can ship cleanly. What are you willing to stop today to protect execution quality?",
  ];

  return options[seed % options.length];
}

function buildContextMessage(context: {
  headline?: string;
  summary?: string;
  industry?: string;
  company?: string;
  values?: string[];
}): string {
  const values = (context.values ?? []).filter(Boolean).join(", ");

  return [context.headline, context.summary, context.industry, context.company, values]
    .filter((part): part is string => Boolean(part && part.trim()))
    .join("\n")
    .trim();
}

async function requestModelDraft(userMessage: string): Promise<string | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;

  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 260,
        messages: [
          { role: "system", content: JRC_DAILY_NOTE_PROMPT },
          { role: "user", content: userMessage || "No context provided." },
        ],
      }),
    });

    if (!response.ok) return null;

    const payload = await response.json();
    const draft = payload?.choices?.[0]?.message?.content;

    return typeof draft === "string" && draft.trim().length > 0 ? draft : null;
  } catch {
    return null;
  }
}

export async function generateJackyeNote(
  context: {
    headline?: string;
    summary?: string;
    industry?: string;
    company?: string;
    values?: string[];
  },
  options?: {
    requestDraft?: (userMessage: string) => Promise<string | null>;
  },
): Promise<string> {
  const userMessage = buildContextMessage(context);
  const requestDraft = options?.requestDraft ?? requestModelDraft;
  const aiDraft = await requestDraft(userMessage);

  if (!aiDraft) {
    return generateTemplateNote();
  }

  const sanitized = sanitizeNote(aiDraft);

  if (!validateNote(sanitized)) {
    return generateTemplateNote();
  }

  return sanitized;
}

export { sanitizeNote, validateNote, generateTemplateNote, buildContextMessage, requestModelDraft };
