// Centralized site configuration for URLs and SEO
// Derives a canonical base URL from environment variables with safe fallbacks.

function normalizeUrl(u?: string | null): string | null {
  if (!u) return null;
  const trimmed = u.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
}

// Priority: explicit public env > generic site url > Vercel provided
const envCandidate =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_URL;

export const SITE_URL = normalizeUrl(envCandidate) || "https://lusotown.com";

export const METADATA_BASE = new URL(SITE_URL);

// Helper to build absolute URLs safely
export const absoluteUrl = (path = "/"): string => {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};
