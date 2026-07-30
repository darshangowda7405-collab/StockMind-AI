import pandas as pd
from ta.trend import SMAIndicator, EMAIndicator, MACD
from ta.momentum import RSIIndicator
from ta.volatility import BollingerBands


def add_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Add technical indicators to OHLCV data.
    Compatible with latest yfinance versions.
    """

    # Flatten MultiIndex columns if needed
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    close = df["Close"].astype(float)

    # ==========================
    # Moving Averages
    # ==========================

    df["SMA20"] = SMAIndicator(
        close=close,
        window=20,
    ).sma_indicator()

    df["SMA50"] = SMAIndicator(
        close=close,
        window=50,
    ).sma_indicator()

    df["EMA20"] = EMAIndicator(
        close=close,
        window=20,
    ).ema_indicator()

    # ==========================
    # RSI
    # ==========================

    df["RSI"] = RSIIndicator(
        close=close,
        window=14,
    ).rsi()

    # ==========================
    # MACD
    # ==========================

    macd = MACD(close=close)

    df["MACD"] = macd.macd()
    df["MACD_SIGNAL"] = macd.macd_signal()

    # ==========================
    # Bollinger Bands
    # ==========================

    bb = BollingerBands(
        close=close,
        window=20,
    )

    df["BB_HIGH"] = bb.bollinger_hband()
    df["BB_LOW"] = bb.bollinger_lband()

    # ==========================
    # Returns & Volatility
    # ==========================

    df["Daily_Return"] = close.pct_change()

    df["Volatility"] = (
        df["Daily_Return"]
        .rolling(20)
        .std()
    )

    # IMPORTANT:
    # Do NOT drop rows here.
    # Keep the full dataframe so the frontend
    # still receives the requested period.
    return df