import React from "react";

interface FormattedMessageProps {
  content: string;
}

/**
 * Parses inline bold markdown (**text**) into <strong> tags
 */
function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="gpt__bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/**
 * Cleanly formats AI responses into structured titles, paragraphs, and list items
 * eliminating raw asterisks and rigid markdown clutter.
 */
export default function FormattedMessage({ content }: FormattedMessageProps) {
  if (!content) return null;

  // Split by double newlines or single newlines with bullet patterns
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${keyPrefix}`} className="gpt__list">
          {currentList.map((item, idx) => (
            <li key={idx} className="gpt__list-item">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(index);
      return;
    }

    // Check for bullet list item (* or -)
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.*)/);
    if (bulletMatch) {
      currentList.push(bulletMatch[1]);
      return;
    }

    // Check for numbered list item (e.g. "1. ")
    const numberMatch = trimmed.match(/^\d+\.\s+(.*)/);
    if (numberMatch) {
      // Check if it's a standalone section title like "**1. Title:**"
      const isTitle = trimmed.startsWith("**") && trimmed.endsWith("**");
      if (!isTitle) {
        currentList.push(trimmed);
        return;
      }
    }

    // If we were collecting list items, flush them before processing a non-list line
    flushList(index);

    // Section title pattern: "**Heading**" or "**1. Heading:**" or "### Heading"
    if (
      (trimmed.startsWith("**") && trimmed.endsWith("**")) ||
      trimmed.startsWith("### ") ||
      trimmed.startsWith("## ")
    ) {
      const cleanTitle = trimmed
        .replace(/^#+\s*/, "")
        .replace(/^\*\*/, "")
        .replace(/\*\*$/, "")
        .trim();

      elements.push(
        <div key={`title-${index}`} className="gpt__section-title">
          {cleanTitle}
        </div>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="gpt__paragraph">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList(lines.length);

  return <div className="gpt__formatted-content">{elements}</div>;
}
