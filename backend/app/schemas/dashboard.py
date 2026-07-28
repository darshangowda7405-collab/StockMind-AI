from pydantic import BaseModel


class MarketIndex(BaseModel):
    name: str
    symbol: str
    price: float
    change: float
    change_percent: float


class TrendingStock(BaseModel):
    symbol: str
    company: str
    price: float
    change: float
    change_percent: float


class DashboardResponse(BaseModel):
    market_indices: list[MarketIndex]
    trending_stocks: list[TrendingStock]