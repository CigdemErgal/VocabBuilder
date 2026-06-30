import { api } from "./client";
import type { WordCategory } from "../types/word";

type FetchWordParams = {
  keyword?: string;
  category?: WordCategory | null;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
};

export type BackendWord = {
  _id: string;
  en: string;
  ua: string;
  category: WordCategory;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
};

export type PaginatedWordsResponse = {
  results: BackendWord[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type StatisticsResponse = {
  totalCount: number;
};

type CreateWordRequest = {
  en: string;
  ua: string;
  category: WordCategory;
  isIrregular?: boolean;
};

export async function fetchOwnWords(params: FetchWordParams) {
  const { data } = await api.get<PaginatedWordsResponse>("/words/own", {
    params,
  });
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get<WordCategory[]>("/words/categories");
  return data;
}

export async function fetchStatistics() {
  const { data } = await api.get<StatisticsResponse>("/words/statistics");
  return data;
}

export async function createWord(payload: CreateWordRequest) {
  const { data } = await api.post<BackendWord>("/words/create", payload);
  return data;
}
