import pandas as pd


def calculate_indicators(df: pd.DataFrame):

    df = df.copy()

    close = pd.Series(df["Close"], index=df.index, dtype="float64")

    # SMA
    df["SMA20"] = close.rolling(20).mean()
    df["SMA50"] = close.rolling(50).mean()

    # EMA
    df["EMA20"] = close.ewm(span=20, adjust=False).mean()

    # RSI
    delta = close.diff()

    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()

    rs = avg_gain / avg_loss

    df["RSI"] = 100 - (100 / (1 + rs))

    # MACD
    ema12 = close.ewm(span=12, adjust=False).mean()
    ema26 = close.ewm(span=26, adjust=False).mean()

    df["MACD"] = ema12 - ema26

    # Bollinger Bands
    std20 = close.rolling(20).std()

    df["UpperBand"] = df["SMA20"] + (2 * std20)
    df["LowerBand"] = df["SMA20"] - (2 * std20)

    # Return
    df["Return"] = close.pct_change()

    # Volatility
    df["Volatility"] = df["Return"].rolling(20).std()

    return df