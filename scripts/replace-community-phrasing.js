#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const exts = new Set(['.json', '.md', '.mdx', '.ts', '.tsx', '.js', '.jsx', '.sql', '.env', '.toml', '.yml', '.yaml', '.txt', '.html', '.css', '.sh', '.example']);

const root = process.cwd();
const targets = [
  'web-app/src/i18n/en.json',
  'web-app/src/i18n/pt.json',
  'web-app/public/sw.js',
  'web-app/.env.local.example',
  'web-app',
  'mobile-app',
  'streaming',
  '.',
];

const replacements = [
  // English variants
  { from: /United Kingdom's Portuguese-speaking community platform/g, to: "United Kingdom's Portuguese-speaking community platform" },
  { from: /Portuguese-speaking community/g, to: 'Portuguese-speaking community' },
  { from: /Portuguese-speaking community/gi, to: 'Portuguese-speaking community' },
  { from: /Portuguese-speaking Friends/g, to: 'Portuguese-speaking Friends' },
  { from: /Portuguese-speaking friends/g, to: 'Portuguese-speaking friends' },
  { from: /Portuguese-speaking community Centre/g, to: 'Portuguese-speaking community Centre' },

  // United Kingdom -> United Kingdom (case sensitive and common patterns)
  // Note: avoid blindly replacing lowercase 'uk' to prevent breaking .uk domains/URLs
  // Standalone uppercase United Kingdom
  { from: /\bUK\b/g, to: 'United Kingdom' },
  // Dotted variant often used in prose
  { from: /\bU\.K\.?\b/g, to: 'United Kingdom' },
  // In parentheses or with prepositions
  { from: /\bUK\)/g, to: 'United Kingdom)' },
  { from: /\(United Kingdom\b/g, to: '(United Kingdom' },
  { from: /in the United Kingdom\b/g, to: 'in the United Kingdom' },
  { from: /across the United Kingdom\b/g, to: 'across the United Kingdom' },
  { from: /throughout the United Kingdom\b/g, to: 'throughout the United Kingdom' },
  { from: /within the United Kingdom\b/g, to: 'within the United Kingdom' },
  { from: /United Kingdom-wide\b/g, to: 'United Kingdom-wide' },
  { from: /\bUK-/g, to: 'United Kingdom-' },
  { from: /United Kingdom market\b/g, to: 'United Kingdom market' },
  { from: /United Kingdom economy\b/g, to: 'United Kingdom economy' },
  { from: /United Kingdom community\b/g, to: 'United Kingdom community' },
  { from: /United Kingdom Portuguese/gi, to: 'United Kingdom Portuguese' },
  { from: /Portuguese in the United Kingdom/gi, to: 'Portuguese in the United Kingdom' },


  // Portuguese (pt) variants - preserve accents and common casings
  { from: /Comunidade de Falantes de Português/g, to: 'Comunidade de Falantes de Português' },
  { from: /comunidade de falantes de português/g, to: 'comunidade de falantes de português' },
  { from: /Comunidade de falantes de português/g, to: 'Comunidade de falantes de português' },
  { from: /comunidade de Falantes de Português/g, to: 'comunidade de Falantes de Português' },
  // Portuguese equivalents of United Kingdom (ensure correct phrasing)
  { from: /\bReino Unido\b/g, to: 'Reino Unido' },
  { from: /no United Kingdom\b/g, to: 'no Reino Unido' },
  { from: /no Reino Unido\b/g, to: 'no Reino Unido' },
];

function isSpecialName(file) {
  const base = path.basename(file);
  return (
    base.startsWith('Dockerfile') ||
    base === 'docker-compose.yml' ||
    base.endsWith('.env') ||
    base.startsWith('.env') ||
    base.endsWith('.env.local.example') ||
    base.endsWith('.env.production.example') ||
    base.endsWith('.env.heritage.example')
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
    const text = slice.toString('utf8');
    return /^[\s\S]*$/.test(text); // allow
  } catch (e) {
    return false;
  }
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist' || entry.name === 'build' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function apply(file) {
  if (!isTextFile(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;
  for (const { from, to } of replacements) {
    updated = updated.replace(from, to);
  }
  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('Updated:', path.relative(root, file));
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

console.log('Replacement pass complete.');
