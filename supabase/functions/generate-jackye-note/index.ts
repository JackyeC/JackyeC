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

export async function generateJackyeNote(context: {
  headline?: string;
  summary?: string;
  industry?: string;
  company?: string;
  values?: string[];
}): Promise<string> {
  const userMessage = [
    `Headline: ${context.headline ?? "N/A"}`,
    `Summary: ${context.summary ?? "N/A"}`,
    `Industry: ${context.industry ?? "N/A"}`,
    `Company: ${context.company ?? "N/A"}`,
    `Values: ${(context.values ?? []).join(", ") || "N/A"}`,
  ].join("\n");

  // Placeholder for provider call; replace with your model invocation.
  const aiDraft = `${JRC_DAILY_NOTE_PROMPT}\n\n${userMessage}`;
  const sanitized = sanitizeNote(aiDraft);

  if (!validateNote(sanitized)) {
    return generateTemplateNote();
  }

  return sanitized;
}

export { sanitizeNote, validateNote, generateTemplateNote };
