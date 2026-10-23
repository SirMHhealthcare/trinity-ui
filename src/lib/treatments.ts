/**
 * Treatment content loader.
 *
 * Every folder in src/content/treatments/ is one treatment page. A folder needs:
 *   content.md   – front matter (title, summary, ...) + page body in Markdown
 *   image.jpg    – card image (.jpg, .jpeg, .png or .webp)
 *   hero.jpg     – optional banner for the treatment page (falls back to the default)
 *
 * The folder name becomes the URL: src/content/treatments/asthma -> /treatment/asthma
 * Nothing in the code needs editing to add, remove or reorder treatments.
 * See src/content/treatments/README.md for the full format.
 */

export interface Treatment {
  /** URL slug, taken from the folder name */
  id: string;
  /** Short name used on cards, breadcrumbs, footer and related links */
  title: string;
  /** Position on the homepage (lower first) */
  order: number;
  /** One-line description shown on the homepage card */
  summary: string;
  /** Extra text shown when a homepage card is expanded */
  cardDetail: string;
  /** Main heading on the treatment page */
  pageTitle: string;
  /** Browser tab / Google title */
  seoTitle: string;
  /** Google / social description */
  seoDescription: string;
  /** Page content in Markdown */
  body: string;
  /** Card image URL */
  image: string;
  /** Optional banner image URL for the treatment page */
  hero?: string;
}

const contentFiles = import.meta.glob("/src/content/treatments/*/content.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const imageFiles = import.meta.glob("/src/content/treatments/*/image.{jpg,jpeg,png,webp}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const heroFiles = import.meta.glob("/src/content/treatments/*/hero.{jpg,jpeg,png,webp}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const folderOf = (path: string) => path.split("/").slice(-2, -1)[0];

const byFolder = (files: Record<string, string>) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [folderOf(path), url]));

/** Minimal front matter parser: `key: value` lines between --- markers. */
export const parseFrontMatter = (raw: string) => {
  const match = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string | number>, body: raw };

  const data: Record<string, string | number> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^\s*([A-Za-z][\w-]*)\s*:\s*(.*?)\s*$/);
    if (!field) continue;
    const [, key, value] = field;
    if (value.startsWith('"')) {
      try {
        data[key] = JSON.parse(value);
        continue;
      } catch {
        /* fall through to plain text */
      }
    }
    if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value.replace(/^'(.*)'$/, "$1").replace(/^"(.*)"$/, "$1");
  }
  return { data, body: match[2] };
};

const images = byFolder(imageFiles);
const heroes = byFolder(heroFiles);

export const treatments: Treatment[] = Object.entries(contentFiles)
  .map(([path, raw]): Treatment | null => {
    const id = folderOf(path);
    const { data, body } = parseFrontMatter(raw);
    const str = (key: string) => (data[key] === undefined ? "" : String(data[key]).trim());

    const title = str("title");
    if (!title || !images[id]) {
      console.error(
        `[treatments] Skipping "${id}": ${!title ? "content.md has no title" : "no image.jpg/png/webp in the folder"}.`
      );
      return null;
    }

    const summary = str("summary");
    const pageTitle = str("pageTitle") || title;
    return {
      id,
      title,
      order: typeof data.order === "number" ? data.order : 999,
      summary,
      cardDetail: str("cardDetail") || summary,
      pageTitle,
      seoTitle: str("seoTitle") || `${pageTitle} | Trinity Homeopathy`,
      seoDescription: str("seoDescription") || summary,
      body: body.trim(),
      image: images[id],
      hero: heroes[id],
    };
  })
  .filter((t): t is Treatment => t !== null)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const getTreatment = (id: string | undefined) => treatments.find(t => t.id === id);
