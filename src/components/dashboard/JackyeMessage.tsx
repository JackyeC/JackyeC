import React from "react";

type JackyeMessageProps = {
  message: string;
};

const ARTIFACT_PATTERNS = [
  /<think>/i,
  /jrc\s*edit/i,
  /\bdraft\b/i,
  /system prompt/i,
  /assistant:/i,
];

function hasArtifacts(message: string): boolean {
  return ARTIFACT_PATTERNS.some((pattern) => pattern.test(message));
}

export function JackyeMessage({ message }: JackyeMessageProps) {
  const contaminated = hasArtifacts(message);
  const renderedMessage = contaminated
    ? "Still reviewing today's signal. Check back shortly."
    : message;

  return (
    <div>
      <p>{renderedMessage}</p>
      <p>Always in your corner — Jackye</p>
    </div>
  );
}

export { hasArtifacts };
