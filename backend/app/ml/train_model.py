import os
import joblib
import yfinance as yf
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

from app.utils.indicators import add_indicators

# -----------------------------------------
# Download Historical Data
# -----------------------------------------

symbol = "AAPL"

df = yf.download(
    symbol,
    period="5y",
    auto_adjust=False
)

df = add_indicators(df)

# -----------------------------------------
# Target
# -----------------------------------------

df["Target"] = df["Close"].shift(-1)

df.dropna(inplace=True)

# -----------------------------------------
# Features
# -----------------------------------------

FEATURES = [
    "Open",
    "High",
    "Low",
    "Close",
    "Volume",
    "SMA20",
    "SMA50",
    "EMA20",
    "RSI",
    "MACD",
    "MACD_SIGNAL",
    "BB_HIGH",
    "BB_LOW",
    "Daily_Return",
    "Volatility",
]

X = df[FEATURES]
y = df["Target"]

# -----------------------------------------
# Train Test Split
# -----------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

# -----------------------------------------
# Model
# -----------------------------------------

model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)

print(f"\nMAE: {mae:.4f}")

# -----------------------------------------
# Save
# -----------------------------------------

os.makedirs("app/ml", exist_ok=True)

joblib.dump(model, "app/ml/stock_model.pkl")
joblib.dump(FEATURES, "app/ml/feature_columns.pkl")

print("\nModel saved successfully!")