import joblib
from pathlib import Path
import yfinance as yf

from app.utils.indicators import add_indicators
from app.services.advisor_service import AdvisorService

BASE_DIR = Path(__file__).resolve().parents[1]

MODEL = joblib.load(BASE_DIR / "ml" / "models" / "stock_model.pkl")
FEATURES = joblib.load(BASE_DIR / "ml" / "feature_columns.pkl")

class PredictionService:

    @staticmethod
    def predict(symbol: str):

        df = yf.download(
            symbol,
            period="1y",
            auto_adjust=False,
            progress=False,
        )

        if df.empty:
            return None

        # Flatten MultiIndex columns returned by yfinance
        if hasattr(df.columns, "nlevels") and df.columns.nlevels > 1:
            df.columns = df.columns.get_level_values(0)

        df = add_indicators(df)

        # Remove rows where indicators aren't available yet
        df = df.dropna()

        if df.empty:
            return None

        latest = df.iloc[-1]

        X = latest[FEATURES].to_frame().T

        predicted_price = float(MODEL.predict(X)[0])

        current_price = float(latest["Close"])

        change_percent = (
            (predicted_price - current_price)
            / current_price
        ) * 100

        if change_percent > 2:
            signal = "BUY"
        elif change_percent < -2:
            signal = "SELL"
        else:
            signal = "HOLD"

        confidence = round(
            min(99, max(60, 100 - abs(change_percent) * 3)),
            2,
        )

        trend = (
            "Bullish"
            if latest["SMA20"] > latest["SMA50"]
            else "Bearish"
        )

        if latest["Volatility"] > 0.03:
            risk = "High"
        elif latest["Volatility"] > 0.015:
            risk = "Medium"
        else:
            risk = "Low"

        explanation = AdvisorService.generate(
            current_price=current_price,
            predicted_price=predicted_price,
            rsi=float(latest["RSI"]),
            macd=float(latest["MACD"]),
            macd_signal=float(latest["MACD_SIGNAL"]),
            sma20=float(latest["SMA20"]),
            sma50=float(latest["SMA50"]),
            volatility=float(latest["Volatility"]),
        )

        return {
            "symbol": symbol.upper(),
            "current_price": round(current_price, 2),
            "predicted_price": round(predicted_price, 2),
            "change_percent": round(change_percent, 2),
            "signal": signal,
            "confidence": confidence,
            "trend": trend,
            "risk": risk,
            "explanation": explanation,
        }