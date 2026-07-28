import os
import joblib
import pandas as pd
import yfinance as yf

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from app.ml.indicators import calculate_indicators

MODEL_DIR = "app/ml/models"
MODEL_PATH = os.path.join(MODEL_DIR, "stockmind_model.pkl")

os.makedirs(MODEL_DIR, exist_ok=True)

print("Downloading stock data...")

df = yf.download(
    "AAPL",
    period="5y",
    auto_adjust=True,
    progress=False,
)

# -----------------------------
# Normalize yfinance output
# -----------------------------
if isinstance(df.columns, pd.MultiIndex):
    df.columns = df.columns.get_level_values(0)

required_columns = ["Open", "High", "Low", "Close", "Volume"]
df = df[required_columns].copy()

for col in required_columns:
    if isinstance(df[col], pd.DataFrame):
        df[col] = df[col].iloc[:, 0]

print("\nColumns:")
print(df.columns)

if df.empty:
    raise Exception("No stock data downloaded.")

print("\nCalculating indicators...")

df = calculate_indicators(df)

df["Target"] = (df["Close"].shift(-1) > df["Close"]).astype(int)

df = df.dropna()

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
    shuffle=False,
)

print("\nTraining Random Forest...")

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"\nAccuracy : {accuracy:.2%}")

joblib.dump(model, MODEL_PATH)

print(f"\nModel saved successfully:\n{MODEL_PATH}")