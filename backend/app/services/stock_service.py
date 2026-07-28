import yfinance as yf


def get_stock(symbol: str):
    ticker = yf.Ticker(symbol)

    info = ticker.info

    return {
        "symbol": info.get("symbol"),
        "company": info.get("longName"),
        "price": info.get("currentPrice"),
        "currency": info.get("currency"),
        "exchange": info.get("exchange"),
        "sector": info.get("sector"),
    }


def get_history(symbol: str, period: str = "6mo"):
    ticker = yf.Ticker(symbol)

    history = ticker.history(period=period)

    data = []

    for date, row in history.iterrows():
        data.append(
            {
                "date": date.strftime("%Y-%m-%d"),
                "open": float(row["Open"]),
                "high": float(row["High"]),
                "low": float(row["Low"]),
                "close": float(row["Close"]),
                "volume": int(row["Volume"]),
            }
        )

    return data