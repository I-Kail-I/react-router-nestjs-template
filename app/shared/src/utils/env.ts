export type AppEnv = "development" | "production" | "test";

export const isProd = (mode?: string): boolean => mode === "production";
export const isDev = (mode?: string): boolean => mode === "development";
export const isTest = (mode?: string): boolean => mode === "test";

export const isBrowser = (): boolean => typeof window !== "undefined";
export const isServer = (): boolean => typeof window === "undefined";
