import api from "./api";

export interface SearchResult {
  symbol: string;
  company: string;
}

export async function searchStocks(
  query: string
): Promise<SearchResult[]> {

  if (!query.trim()) return [];

  const response = await api.get(
    `/search?q=${encodeURIComponent(query)}`
  );

  return response.data;
}