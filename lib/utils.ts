// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateRange(daysBack: number) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - daysBack);
  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

export function getFormattedTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export type RawNewsArticle = {
  id?: number;
  headline?: string;
  summary?: string;
  source?: string;
  url?: string;
  datetime?: number;
  image?: string;
  category?: string;
  related?: string;
};

export function validateArticle(article: RawNewsArticle): boolean {
  return !!(
    article &&
    article.headline &&
    article.summary &&
    article.source &&
    article.url &&
    article.datetime
  );
}

export function formatArticle(
  article: RawNewsArticle,
  isCompanySpecific: boolean = false,
  symbol?: string,
  index: number = 0
) {
  return {
    id: article.id || Date.now() + index,
    headline: article.headline || "No headline",
    summary: article.summary || "No summary",
    source: article.source || "Unknown",
    url: article.url || "#",
    datetime: article.datetime || Date.now() / 1000,
    image: article.image,
    category: article.category || "general",
    related: article.related || symbol || "",
    isCompanySpecific,
  };
}