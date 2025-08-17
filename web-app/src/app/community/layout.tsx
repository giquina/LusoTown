import type { Metadata } from "next";
import { metadataFor } from "@/lib/next-metadata";

export const metadata: Metadata = metadataFor("community", "/community");

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
