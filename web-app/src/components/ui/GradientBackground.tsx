"use client";

import React from "react";
import clsx from "clsx";

type Variant = "heritage" | "brand" | "subtle";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
}

// Simple gradient wrapper aligned with brand tokens
export default function GradientBackground({
  children,
  className = "",
  variant = "brand",
}: GradientBackgroundProps) {
  const base = "relative overflow-hidden";
  const styles: Record<Variant, string> = {
    heritage:
      "bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600",
    brand: "bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600",
    subtle: "bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50",
  };
  return (
    <div className={clsx(base, styles[variant], className)}>{children}</div>
  );
}
