import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://trinityhomeopathy.com";
const TREATMENTS_DIR = path.resolve(__dirname, "src/content/treatments");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/** Lists treatment folders and the problems that would stop them appearing on the site. */
const scanTreatments = () => {
  const slugs: string[] = [];
  const problems: string[] = [];
  if (!fs.existsSync(TREATMENTS_DIR)) return { slugs, problems };

  for (const entry of fs.readdirSync(TREATMENTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const dir = path.join(TREATMENTS_DIR, slug);
    const contentFile = path.join(dir, "content.md");

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      problems.push(`"${slug}": folder name must be lowercase letters, numbers and hyphens (it becomes the URL).`);
    }
    if (!fs.existsSync(contentFile)) {
      problems.push(`"${slug}": missing content.md.`);
    } else if (!/^﻿?---\r?\n[\s\S]*?^\s*title\s*:\s*\S/m.test(fs.readFileSync(contentFile, "utf8"))) {
      problems.push(`"${slug}": content.md needs front matter with a title (see README.md in the treatments folder).`);
    }
    if (!IMAGE_EXTENSIONS.some(ext => fs.existsSync(path.join(dir, `image${ext}`)))) {
      problems.push(`"${slug}": missing card image (image.jpg, image.jpeg, image.png or image.webp).`);
    }
    slugs.push(slug);
  }
  return { slugs: slugs.sort(), problems };
};

/** Validates treatment folders and adds every treatment page to the built sitemap.xml. */
const treatmentsPlugin = (): Plugin => {
  let outDir = "dist";
  return {
    name: "trinity-treatments",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    buildStart() {
      const { problems } = scanTreatments();
      if (problems.length) {
        this.error(`Treatment content problems:\n  - ${problems.join("\n  - ")}`);
      }
    },
    closeBundle() {
      const sitemapPath = path.join(outDir, "sitemap.xml");
      if (!fs.existsSync(sitemapPath)) return;
      const entries = scanTreatments()
        .slugs.map(
          slug =>
            `  <url>\n    <loc>${SITE_URL}/treatment/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
        )
        .join("");
      const sitemap = fs
        .readFileSync(sitemapPath, "utf8")
        .replace(/[ \t]*<url>\s*<loc>[^<]*\/treatment\/[^<]*<\/loc>[\s\S]*?<\/url>\s*/g, "")
        .replace("</urlset>", `${entries}</urlset>`);
      fs.writeFileSync(sitemapPath, sitemap);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), treatmentsPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
