import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Small Markdown renderer for treatment pages.
 * Supports: ## / ### headings, paragraphs, "- " bullet lists, "1. " numbered lists,
 * **bold**, *italic* and [links](/path-or-url). A single "#" heading is shown as "##"
 * because the page already has its own main heading.
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

const renderInline = (text: string): ReactNode[] =>
  text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className = "text-primary underline underline-offset-4";
      return href.startsWith("/") ? (
        <Link key={i} to={href} className={className}>{label}</Link>
      ) : (
        <a key={i} href={href} className={className} target="_blank" rel="noopener noreferrer">{label}</a>
      );
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{renderInline(part.slice(1, -1))}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });

type Block =
  | { kind: "h2" | "h3" | "h4" | "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

const parseBlocks = (source: string): Block[] => {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (paragraph.length) blocks.push({ kind: "p", text: paragraph.join(" ") });
    if (list) blocks.push(list);
    paragraph = [];
    list = null;
  };

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flush();
      const level = Math.max(2, heading[1].length) as 2 | 3 | 4;
      blocks.push({ kind: `h${level}`, text: heading[2] });
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const kind = bullet ? "ul" : "ol";
      if (paragraph.length || (list && list.kind !== kind)) flush();
      if (!list) list = { kind, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    if (list) {
      // continuation of the previous list item
      if (/^\s{2,}/.test(rawLine) && list.items.length) {
        list.items[list.items.length - 1] += " " + line;
        continue;
      }
      flush();
    }
    paragraph.push(line);
  }
  flush();
  return blocks;
};

const Markdown = ({ source }: { source: string }) => (
  <>
    {parseBlocks(source).map((block, index) => {
      switch (block.kind) {
        case "h2":
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-heading font-bold text-foreground pt-4">
              {renderInline(block.text)}
            </h2>
          );
        case "h3":
          return (
            <h3 key={index} className="text-xl font-heading font-semibold text-foreground pt-2">
              {renderInline(block.text)}
            </h3>
          );
        case "h4":
          return (
            <h4 key={index} className="text-lg font-heading font-semibold text-foreground">
              {renderInline(block.text)}
            </h4>
          );
        case "ul":
        case "ol": {
          const ListTag = block.kind;
          return (
            <ListTag
              key={index}
              className={`${block.kind === "ul" ? "list-disc" : "list-decimal"} pl-6 space-y-2 text-muted-foreground text-lg leading-relaxed`}
            >
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ListTag>
          );
        }
        default:
          return (
            <p key={index} className="text-muted-foreground text-lg leading-relaxed">
              {renderInline(block.text)}
            </p>
          );
      }
    })}
  </>
);

export default Markdown;
