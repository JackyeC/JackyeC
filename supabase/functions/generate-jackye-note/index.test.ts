import {
  buildContextMessage,
  generateJackyeNote,
  generateTemplateNote,
  sanitizeNote,
} from "./index.ts";

Deno.test("generateJackyeNote validates and returns model output (regression)", async () => {
  const note = [
    "Labor demand is rising for this role family and candidate expectations are moving faster than comp bands.",
    "Your current outreach is clear on mission but light on decision scope, which can lower conversion quality.",
    "Pick one priority role and tighten the scorecard plus success metrics before the next interview loop.",
    "Which role will you recalibrate today to improve signal quality?",
  ].join("\n");

  const result = await generateJackyeNote(
    {
      headline: "Hiring market update",
      summary: "Competition for senior talent is increasing.",
      industry: "HR tech",
      company: "People Puzzle Collective",
      values: ["inclusion", "clarity"],
    },
    {
      requestDraft: async () => note,
    },
  );

  if (result !== note) {
    throw new Error("Expected validated model output to be returned directly.");
  }
});

Deno.test("generateJackyeNote sanitizes scaffold lines before validating", async () => {
  const rawDraft = [
    "Here is your draft:",
    "Industry conditions are shifting faster than role definitions, and ambiguity is slowing decisions.",
    "You can protect momentum by tightening role scope and setting clear interview success criteria now.",
    "Choose one hiring lane to simplify before new outreach starts this week.",
    "What decision bottleneck will you remove first?",
  ].join("\n");

  const expected = sanitizeNote(rawDraft);

  const result = await generateJackyeNote(
    { headline: "Weekly talent signal" },
    {
      requestDraft: async () => rawDraft,
    },
  );

  if (result !== expected) {
    throw new Error("Expected sanitized model output to be returned.");
  }
});

Deno.test("buildContextMessage composes only user context fields", () => {
  const userMessage = buildContextMessage({
    headline: "Headline",
    summary: "Summary",
    industry: "Industry",
    company: "Company",
    values: ["value-1", "", "value-2"],
  });

  const expected = "Headline\nSummary\nIndustry\nCompany\nvalue-1, value-2";

  if (userMessage !== expected) {
    throw new Error(`Unexpected user message: ${userMessage}`);
  }
});

Deno.test("generateJackyeNote falls back to template when model output is missing", async () => {
  const result = await generateJackyeNote(
    { headline: "Headline" },
    {
      requestDraft: async () => null,
    },
  );

  const expected = generateTemplateNote();
  if (result !== expected) {
    throw new Error("Expected fallback template note when model draft is null.");
  }
});
