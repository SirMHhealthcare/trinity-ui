# Treatment pages

Each folder here is one treatment. The site picks folders up automatically:
the homepage card, the `/treatment/<folder-name>` page, the footer list,
"Other Treatments" links and the sitemap all come from these files.
No code changes are needed to add, edit, reorder or remove a treatment.

## Add a new treatment

1. Create a folder. Its name becomes the URL, so use lowercase letters,
   numbers and hyphens only, e.g. `migraine` → `/treatment/migraine`.
2. Add `content.md` (format below).
3. Add the card image as `image.jpg` (`.jpeg`, `.png` and `.webp` also work).
   Portrait or landscape both work; the card shows a centred 3:2 crop.
   Existing images are 512×640.
4. Optional: add `hero.jpg` for the banner at the top of the treatment page.
   Without it, the shared default banner is used.

The build stops with a clear message if a folder is missing `content.md`,
a title or an image.

## content.md format

```markdown
---
title: "Migraine"
order: 10
summary: "One line shown on the homepage card"
cardDetail: "A few sentences shown when the homepage card is expanded"
pageTitle: "Migraine: Causes, Symptoms and Homeopathic Management"
seoTitle: "Homeopathy for Migraine | Trinity Homeopathy"
seoDescription: "Shown in Google results and link previews (about 150 characters)."
---

## First heading

A paragraph of text with **bold words** and a [link](/#booking).

- A bullet point
- Another bullet point

### A smaller heading

1. A numbered item
2. Another numbered item
```

| Field            | Required | Used for                                       | If left out           |
| ---------------- | -------- | ---------------------------------------------- | --------------------- |
| `title`          | yes      | Card, breadcrumb, footer, related links        | –                     |
| `order`          | no       | Position on the homepage (lower comes first)   | Placed last           |
| `summary`        | no       | One-liner on the homepage card                 | Empty                 |
| `cardDetail`     | no       | Text when the card is expanded                 | `summary`             |
| `pageTitle`      | no       | Main heading on the treatment page             | `title`               |
| `seoTitle`       | no       | Browser tab and Google title                   | `pageTitle \| Trinity Homeopathy` |
| `seoDescription` | no       | Google and social preview description          | `summary`             |

Put values in double quotes, especially if they contain a colon (`:`).
Hindi / Hinglish text works as-is.

The page body (everything after the second `---`) supports `##` and `###`
headings, paragraphs, `-` bullet lists, `1.` numbered lists, `**bold**`,
`*italic*` and `[links](/path)`.

### Converting from Word

- **Google Docs:** File → Download → Markdown (.md).
- **pandoc:** `pandoc Asthma.docx -t gfm -o content.md`, then add the front
  matter block at the top. Word documents often use bold lines instead of real
  headings; change those to `##` / `###`.
