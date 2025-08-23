#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const exts = new Set([
  ".json",
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".sql",
  ".env",
  ".toml",
  ".yml",
  ".yaml",
  ".txt",
  ".html",
  ".css",
  ".sh",
  ".example",
]);

const root = process.cwd();
const targets = [
  "web-app/src/i18n/en.json",
  "web-app/src/i18n/pt.json",
  "web-app/public/sw.js",
  "web-app/.env.local.example",
  "web-app",
  "mobile-app",
  "streaming",
  ".",
];

const replacements = [
  // English variants
  {
    from: /UK's Portuguese-speaking community platform/g,
    to: "UK's Portuguese-speaking community platform",
  },
  {
    from: /Portuguese-speaking Community/g,
    to: "Portuguese-speaking Community",
  },
  {
    from: /Portuguese-speaking community/gi,
    to: "Portuguese-speaking community",
  },
  { from: /Portuguese-speaking Friends/g, to: "Portuguese-speaking Friends" },
  { from: /Portuguese-speaking friends/g, to: "Portuguese-speaking friends" },
  {
    from: /Portuguese-speaking Community Centre/g,
    to: "Portuguese-speaking Community Centre",
  },

  // Portuguese (pt) variants - preserve accents and common casings
  {
    from: /Comunidade de Falantes de Português/g,
    to: "Comunidade de Falantes de Português",
  },
  {
    from: /comunidade de falantes de português/g,
    to: "comunidade de falantes de português",
  },
  {
    from: /Comunidade de falantes de português/g,
    to: "Comunidade de falantes de português",
  },
  {
    from: /comunidade de Falantes de Português/g,
    to: "comunidade de Falantes de Português",
  },
];

function isSpecialName(file) {
  const base = path.basename(file);
  return (
    base.startsWith("Dockerfile") ||
    base === "docker-compose.yml" ||
    base.endsWith(".env") ||
    base.startsWith(".env") ||
    base.endsWith(".env.local.example") ||
    base.endsWith(".env.production.example") ||
    base.endsWith(".env.heritage.example")
  );
}

function shouldProcess(file) {
  const ext = path.extname(file);
  return exts.has(ext) || isSpecialName(file);
}

function isTextFile(file) {
  // Simple heuristic to avoid binaries
  try {
    const buf = fs.readFileSync(file);
    const slice = buf.subarray(0, 512);
    const text = slice.toString("utf8");
    return /^[\s\S]*$/.test(text); // allow
  } catch (e) {
    return false;
  }
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === "dist" ||
      entry.name === "build" ||
      entry.name === ".git"
    )
      continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function apply(file) {
  if (!isTextFile(file)) return;
  let content = fs.readFileSync(file, "utf8");
  let updated = content;
  for (const { from, to } of replacements) {
    updated = updated.replace(from, to);
  }
  if (updated !== content) {
    fs.writeFileSync(file, updated, "utf8");
    console.log("Updated:", path.relative(root, file));
  }
}

for (const t of targets) {
  const p = path.resolve(root, t);
  if (!fs.existsSync(p)) continue;
  const stat = fs.statSync(p);
  if (stat.isDirectory()) {
    for (const f of walk(p)) if (shouldProcess(f)) apply(f);
  } else if (stat.isFile()) {
    if (shouldProcess(p)) apply(p);
  }
}

console.log("Replacement pass complete.");
