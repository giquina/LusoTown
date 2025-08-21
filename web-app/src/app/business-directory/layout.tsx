import { ROUTES } from '@/config';
import type { Metadata } from "next";
import { metadataFor } from "@/lib/next-metadata";

export const metadata: Metadata = metadataFor(
  "businessDirectory",
  ROUTES.businessDirectory
);

export default function BusinessDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
