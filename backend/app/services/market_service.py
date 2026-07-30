import yfinance as yf
import pandas as pd
import numpy as np
from app.utils.indicators import add_indicators


class MarketService:
    """
    Central service for fetching live market data.
    """

    @staticmethod
    def get_quote(symbol: str):
        try:
            ticker = yf.Ticker(symbol)

            history = ticker.history(
                period="5d",
                auto_adjust=False,
            )

            if history.empty:
                print(f"No market data found for {symbol}")
                return None

            current_price = float(history["Close"].dropna().iloc[-1])

            if len(history["Close"].dropna()) >= 2:
                previous_close = float(history["Close"].dropna().iloc[-2])
            else:
                previous_close = current_price

            change = current_price - previous_close

            change_percent = (
                (change / previous_close) * 100
                if previous_close
                else 0
            )

            return {
                "symbol": symbol.upper(),
                "price": round(current_price, 2),
                "change": round(change, 2),
                "change_percent": round(change_percent, 2),
            }

        except Exception as e:
            print(f"Error fetching quote for {symbol}: {e}")
            return None

    @staticmethod
    def get_company_info(symbol: str):
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info

            return {
                "symbol": symbol.upper(),
                "company": info.get("shortName", symbol),
                "sector": info.get("sector"),
                "industry": info.get("industry"),
                "market_cap": info.get("marketCap"),
                "currency": info.get("currency"),
                "country": info.get("country"),
            }

        except Exception as e:
            print(f"Error fetching company info for {symbol}: {e}")

            return {
                "symbol": symbol.upper(),
                "company": symbol,
                "sector": None,
                "industry": None,
                "market_cap": None,
                "currency": None,
                "country": None,
            }

    @staticmethod
    def get_history(
        symbol: str,
        period: str = "6mo",
    ):
        try:
            interval_map = {
                "1d": "5m",
                "5d": "15m",
                "1mo": "1d",
                "3mo": "1d",
                "6mo": "1d",
                "1y": "1d",
                "max": "1d",
            }

            # Download more history internally so indicators can be calculated
            download_period_map = {
                # Intraday data
                "1d": "5d",
                "5d": "1mo",

                # Daily data
                "1mo": "6mo",
                "3mo": "1y",
                "6mo": "2y",
                "1y": "3y",
                "max": "max",
            }

            interval = interval_map.get(period, "1d")
            download_period = download_period_map.get(period, "1y")

            df = yf.download(
                symbol,
                period=download_period,
                interval=interval,
                auto_adjust=False,
                progress=False,
            )
            
            print("Downloaded shape:", df.shape)
            print("Downloaded columns:", df.columns)
            
            print(
                f"Period={period}, Download={download_period}, "
                f"Interval={interval}, Rows={len(df)}"
            )

            if df.empty:
                return None

            # Flatten MultiIndex columns
            if hasattr(df.columns, "nlevels") and df.columns.nlevels > 1:
                df.columns = df.columns.get_level_values(0)

            # Always calculate indicators
            df = add_indicators(df)

            indicator_columns = [
                "SMA20",
                "SMA50",
                "EMA20",
                "RSI",
                "MACD",
                "MACD_SIGNAL",
                "BB_HIGH",
                "BB_LOW",
            ]

            for col in indicator_columns:
                if col in df.columns:
                    df[col] = df[col].where(pd.notna(df[col]), None)

            # Return only the requested period
            if period == "1d":
                df = df.tail(78)      # Approx. one trading day of 5m candles
            elif period == "5d":
                df = df.tail(130)     # Approx. five trading days of 15m candles
            elif period == "1mo":
                df = df.tail(22)
            elif period == "3mo":
                df = df.tail(66)
            elif period == "6mo":
                df = df.tail(132)
            elif period == "1y":
                df = df.tail(252)

            # Clean invalid values before returning
            df = df.replace([np.inf, -np.inf], np.nan)
            df = df.astype(object)
            df = df.where(pd.notna(df), None)

            df = df.reset_index()
            # Use a consistent "Date" field for the frontend
            if "Datetime" in df.columns:
                df["Date"] = (
                    pd.to_datetime(df["Datetime"])
                    .dt.strftime("%Y-%m-%d %H:%M:%S")
                )
                df.drop(columns=["Datetime"], inplace=True)

            elif "Date" in df.columns:
                df["Date"] = (
                    pd.to_datetime(df["Date"])
                    .dt.strftime("%Y-%m-%d")
                )

            return df
        except Exception as e:
            print(f"Error fetching history for {symbol}: {e}")
            return None

    @staticmethod
    def get_trending_symbols():
        """
        Temporary curated list.
        We'll later replace this with live trending stocks.
        """
        return [
            "AAPL",
            "MSFT",
            "NVDA",
            "TSLA",
            "AMZN",
            "META",
            "GOOGL",
            "AMD",
            "NFLX",
        ]

    @staticmethod
    def get_market_indices():
        return [
            ("S&P 500", "^GSPC"),
            ("NASDAQ", "^IXIC"),
            ("Dow Jones", "^DJI"),
        ]