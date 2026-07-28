import joblib
import yfinance as yf
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

from app.ml.indicators import calculate_indicators


SYMBOL = "AAPL"


print(f"Downloading {SYMBOL} data...")

df = yf.download(
    SYMBOL,
    period="5y",
    interval="1d",
    auto_adjust=True,
)

df = calculate_indicators(df)

# Bullish if tomorrow closes higher than today
df["Target"] = (
    df["Close"].shift(-1) > df["Close"]
).astype(int)

df.dropna(inplace=True)

FEATURES = [
    "SMA20",
    "SMA50",
    "EMA20",
    "RSI",
    "MACD",
    "UpperBand",
    "LowerBand",
    "Return",
    "Volatility",
]

X = df[FEATURES]
y = df["Target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

accuracy = accuracy_score(y_test, pred)

print(f"Accuracy: {accuracy:.2%}")

joblib.dump(
    model,
    "app/ml/models/stockmind_model.pkl",
)

print("Model saved successfully!")