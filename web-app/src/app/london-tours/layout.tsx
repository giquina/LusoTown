import type { Metadata } from "next";
import { metadataFor } from "@/lib/next-metadata";

export const metadata: Metadata = metadataFor("londonTours", "/london-tours");

export default function LondonToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
