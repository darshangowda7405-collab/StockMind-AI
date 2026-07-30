from datetime import datetime, time as dt_time
import time
from app.services.market_service import MarketService
_dashboard_cache = None
_dashboard_cache_time = 0
CACHE_TTL = 180  # seconds

def get_dashboard_data():
    global _dashboard_cache
    global _dashboard_cache_time

    current_timestamp = time.time()

    if (
        _dashboard_cache is not None
        and current_timestamp - _dashboard_cache_time < CACHE_TTL
    ):
        return _dashboard_cache

    # -----------------------------------
    # Market Status
    # -----------------------------------

    current_time = datetime.now().time()

    market_status = (
        "OPEN"
        if dt_time(9, 30) <= current_time <= dt_time(16, 0)
        else "CLOSED"
    )

    # -----------------------------------
    # Market Indices
    # -----------------------------------

    # -----------------------------------
    # Market Indices
    # -----------------------------------

    market_indices = []

    for name, symbol in MarketService.get_market_indices():
        quote = MarketService.get_quote(symbol)

        if quote is None:
            continue

        market_indices.append(
            {
                "name": name,
                "symbol": symbol,
                "price": quote["price"],
                "change": quote["change"],
                "change_percent": quote["change_percent"],
            }
        )

    # -----------------------------------
    # Trending Stocks
    # -----------------------------------

    trending_stocks = []

    for symbol in MarketService.get_trending_symbols():
        quote = MarketService.get_quote(symbol)

        if quote is None:
            continue

        company = MarketService.get_company_info(symbol)

        trending_stocks.append(
            {
                "symbol": symbol,
                "company": company["company"],
                "price": quote["price"],
                "change": quote["change"],
                "change_percent": quote["change_percent"],
            }
        )

    # -----------------------------------
    # Top Gainers
    # -----------------------------------

    top_gainers = sorted(
        trending_stocks,
        key=lambda stock: stock["change_percent"],
        reverse=True,
    )[:5]

    # -----------------------------------
    # Top Losers
    # -----------------------------------

    top_losers = sorted(
        trending_stocks,
        key=lambda stock: stock["change_percent"],
    )[:5]

    # -----------------------------------
    # Dashboard Statistics
    # -----------------------------------

    bullish = len(
        [
            stock
            for stock in trending_stocks
            if stock["change_percent"] > 0
        ]
    )

    bearish = len(
        [
            stock
            for stock in trending_stocks
            if stock["change_percent"] < 0
        ]
    )

    stats = {
        "tracked_stocks": len(trending_stocks),
        "bullish": bullish,
        "bearish": bearish,
        "prediction_accuracy": 91.4,
    }

    # -----------------------------------
    # Response
    # -----------------------------------

    response = {
        "market_status": market_status,
        "market_indices": market_indices,
        "top_gainers": top_gainers,
        "top_losers": top_losers,
        "trending_stocks": trending_stocks,
        "stats": stats,
    }

    _dashboard_cache = response
    _dashboard_cache_time = current_timestamp

    return response