import joblib
import pandas as pd
import yfinance as yf

from app.ml.indicators import calculate_indicators

MODEL_PATH = "app/ml/models/stockmind_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_stock(symbol: str):

    stock = yf.Ticker(symbol)

    info = stock.info

    history = stock.history(period="6mo", auto_adjust=True)

    if history.empty:
        return None

    history = history[["Open", "High", "Low", "Close", "Volume"]].copy()

    history = calculate_indicators(history)

    history = history.dropna()

    latest = history.iloc[-1]

    features = pd.DataFrame([{
        "SMA20": latest["SMA20"],
        "SMA50": latest["SMA50"],
        "EMA20": latest["EMA20"],
        "RSI": latest["RSI"],
        "MACD": latest["MACD"],
        "UpperBand": latest["UpperBand"],
        "LowerBand": latest["LowerBand"],
        "Return": latest["Return"],
        "Volatility": latest["Volatility"],
    }])

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0]

    confidence = round(float(max(probability)) * 100, 2)

    if prediction == 1:
        prediction_text = "Bullish"
        signal = "BUY"
    else:
        prediction_text = "Bearish"
        signal = "SELL"

    if confidence >= 90:
        risk = "Low"
    elif confidence >= 75:
        risk = "Medium"
    else:
        risk = "High"

    expected_return = round((confidence / 100) * 5, 2)

    return {
        "symbol": symbol.upper(),
        "company": info.get("longName", symbol.upper()),
        "current_price": round(float(latest["Close"]), 2),
        "prediction": prediction_text,
        "confidence": confidence,
        "signal": signal,
        "risk": risk,
        "expected_return": expected_return,
        "reasons": [
            "RSI momentum analysed",
            "MACD trend analysed",
            "Moving averages analysed",
            "Volatility analysed"
        ]
    }