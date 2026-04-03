const FALLBACK_NOTES = [
  "Your market signal points to rising expectations around execution speed. That matters because slow handoffs quietly erode trust with both candidates and stakeholders. Pick one bottleneck in your process and assign a single owner by end of day. What handoff can you simplify right now to gain momentum tomorrow?",
  "Recent updates suggest teams are over-indexing on activity instead of outcomes. That matters because busy pipelines can hide weak conversion quality. Review one funnel stage and tighten the definition of success before adding new volume. Which stage needs a clearer quality bar before your next hiring sprint?",
  "The strongest operators in your space are winning through sharper focus, not more initiatives. That matters because fragmented effort creates avoidable rework and decision fatigue. Choose one high-impact priority to protect and defer one low-leverage task this week. What will you deliberately deprioritize today to preserve strategic traction?",
];

export function fallbackNote(seed = new Date().getUTCDate()): string {
  return FALLBACK_NOTES[seed % FALLBACK_NOTES.length];
}
