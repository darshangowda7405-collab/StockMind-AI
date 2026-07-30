import yfinance as yf

from app.utils.indicators import add_indicators

df = yf.download(
    "AAPL",
    period="1y",
    auto_adjust=False
)

df = add_indicators(df)

print(df.tail())

print("\nColumns:\n")
print(df.columns.tolist())