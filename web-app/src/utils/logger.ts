// Centralized logger to avoid eslint no-console warnings in app code
// Only logs in development or when explicitly enabled via window.LUSOTOWN_DEBUG
/* eslint-disable no-console */

type LogLevel = "info" | "warn" | "error";

const shouldLog = () => {
  if (typeof window !== "undefined") {
    // @ts-ignore allow runtime flag
    return (
      process.env.NODE_ENV !== "production" ||
      Boolean((window as any).LUSOTOWN_DEBUG)
    );
  }
  return process.env.NODE_ENV !== "production";
};

const format = (level: LogLevel, args: any[]) => [
  `[LusoTown:${level}]`,
  ...args,
];

export const logger = {
  info: (...args: any[]) => {
    if (!shouldLog()) return;
    console.log(...format("info", args));
  },
  warn: (...args: any[]) => {
    if (!shouldLog()) return;
    console.warn(...format("warn", args));
  },
  error: (...args: any[]) => {
    // Allow errors in all envs, but still route through single point
    console.error(...format("error", args));
  },
};

export default logger;
