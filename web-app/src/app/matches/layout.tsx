import { ROUTES } from '@/config';
import type { Metadata } from "next";
import { metadataFor } from "@/lib/next-metadata";

export const metadata: Metadata = metadataFor("matches", ROUTES.matches);

export default function MatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
