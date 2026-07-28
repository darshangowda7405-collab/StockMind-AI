import yfinance as yf


INDEXES = [
    ("S&P 500", "^GSPC"),
    ("NASDAQ", "^IXIC"),
    ("Dow Jones", "^DJI"),
]

TRENDING = [
    "AAPL",
    "MSFT",
    "NVDA",
    "TSLA",
    "AMZN",
]


def get_quote(symbol: str):
    ticker = yf.Ticker(symbol)
    info = ticker.fast_info

    previous_close = info.get("previous_close") or 0
    current_price = info.get("last_price") or previous_close

    change = current_price - previous_close

    change_percent = (
        (change / previous_close) * 100
        if previous_close
        else 0
    )

    return {
        "price": round(current_price, 2),
        "change": round(change, 2),
        "change_percent": round(change_percent, 2),
    }


def get_dashboard_data():
    indices = []

    for name, symbol in INDEXES:
        quote = get_quote(symbol)

        indices.append(
            {
                "name": name,
                "symbol": symbol,
                **quote,
            }
        )

    trending = []

    for symbol in TRENDING:
        ticker = yf.Ticker(symbol)

        quote = get_quote(symbol)

        trending.append(
            {
                "symbol": symbol,
                "company": ticker.info.get("shortName", symbol),
                **quote,
            }
        )

    return {
        "market_indices": indices,
        "trending_stocks": trending,
    }