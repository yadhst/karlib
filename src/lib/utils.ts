import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import type { SearchParams } from "next/dist/server/request/search-params";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstSearchParams(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  if (!value) return null;

  if (Array.isArray(value)) return value[0];
  return value;
}
