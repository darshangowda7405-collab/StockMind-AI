from pydantic import BaseModel


# -----------------------------------
# Market Index
# -----------------------------------

class MarketIndex(BaseModel):
    name: str
    symbol: str
    price: float
    change: float
    change_percent: float


# -----------------------------------
# Trending Stock
# -----------------------------------

class TrendingStock(BaseModel):
    symbol: str
    company: str
    price: float
    change: float
    change_percent: float


# -----------------------------------
# Top Gainer
# -----------------------------------

class TopGainer(BaseModel):
    symbol: str
    company: str
    price: float
    change: float
    change_percent: float


# -----------------------------------
# Top Loser
# -----------------------------------

class TopLoser(BaseModel):
    symbol: str
    company: str
    price: float
    change: float
    change_percent: float


# -----------------------------------
# Dashboard Statistics
# -----------------------------------

class DashboardStats(BaseModel):
    tracked_stocks: int
    bullish: int
    bearish: int
    prediction_accuracy: float


# -----------------------------------
# Dashboard Response
# -----------------------------------

class DashboardResponse(BaseModel):
    market_status: str

    market_indices: list[MarketIndex]

    top_gainers: list[TopGainer]

    top_losers: list[TopLoser]

    trending_stocks: list[TrendingStock]

    stats: DashboardStats