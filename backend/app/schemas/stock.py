from pydantic import BaseModel


# -----------------------------------
# Company Information
# -----------------------------------

class CompanyInfo(BaseModel):
    symbol: str
    company: str
    sector: str
    industry: str
    country: str
    website: str


# -----------------------------------
# Live Price
# -----------------------------------

class PriceInfo(BaseModel):
    current_price: float
    previous_close: float
    change: float
    change_percent: float
    currency: str
    market_state: str


# -----------------------------------
# Financial Metrics
# -----------------------------------

class FinancialMetrics(BaseModel):
    market_cap: int
    pe_ratio: float | None = None
    forward_pe: float | None = None
    eps: float | None = None
    beta: float | None = None
    dividend_yield: float | None = None
    volume: int
    average_volume: int
    week_52_high: float
    week_52_low: float


# -----------------------------------
# AI Prediction
# -----------------------------------

class PredictionInfo(BaseModel):
    prediction: str
    confidence: float
    expected_return: float
    risk: str
    explanation: list[str]


# -----------------------------------
# News
# -----------------------------------

class NewsItem(BaseModel):
    title: str
    publisher: str
    published_at: str
    url: str


# -----------------------------------
# Complete Stock Details Response
# -----------------------------------

class StockDetailsResponse(BaseModel):
    company: CompanyInfo
    price: PriceInfo
    financials: FinancialMetrics
    prediction: PredictionInfo
    news: list[NewsItem]