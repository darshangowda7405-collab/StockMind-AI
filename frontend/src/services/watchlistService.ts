import api from "./api";

export interface WatchlistItem {
    id: number;
    symbol: string;
    company: string;

    current_price: number;
    change: number;
    change_percent: number;
}

export interface WatchlistRequest {
    symbol: string;
    company: string;
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
    const response = await api.get("/watchlist");
    return response.data;
}

export async function addToWatchlist(
    data: WatchlistRequest
): Promise<WatchlistItem> {
    const response = await api.post("/watchlist", data);
    return response.data;
}

export async function removeFromWatchlist(
    symbol: string
): Promise<void> {
    await api.delete(`/watchlist/${symbol}`);
}

export async function isInWatchlist(
    symbol: string
): Promise<boolean> {
    const response = await api.get<WatchlistItem[]>("/watchlist");

    console.log("===== WATCHLIST =====");
    console.log(response.data);

    const exists = response.data.some(
        (item) =>
            item.symbol.toUpperCase() === symbol.toUpperCase()
    );

    console.log("Checking Symbol:", symbol);
    console.log("Exists:", exists);

    return exists;
}