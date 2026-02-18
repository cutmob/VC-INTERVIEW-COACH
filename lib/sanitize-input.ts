import { TOKEN_REGEX } from "@/lib/constants";

export function normalizeToken(input: string): string {
  return input.trim().toUpperCase();
}

export function isValidTokenFormat(input: string): boolean {
  return TOKEN_REGEX.test(normalizeToken(input));
}
