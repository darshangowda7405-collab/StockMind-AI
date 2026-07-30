from datetime import datetime, time

import yfinance as yf

from app.services.market_service import MarketService
from app.services.prediction_service import PredictionService


class StockService:

    @staticmethod
    def get_stock_details(symbol: str):

        symbol = symbol.upper()

        # -----------------------------
        # Live Quote
        # -----------------------------
        quote = MarketService.get_quote(symbol)

        if quote is None:
            return None

        # -----------------------------
        # Company Info
        # -----------------------------
        company = MarketService.get_company_info(symbol)

        # -----------------------------
        # Financial Information
        # -----------------------------
        ticker = yf.Ticker(symbol)
        info = ticker.info

        # -----------------------------
        # AI Prediction
        # -----------------------------
        prediction = PredictionService.predict(symbol)

        # -----------------------------
        # Market Status
        # -----------------------------
        now = datetime.now().time()

        market_state = (
            "OPEN"
            if time(9, 30) <= now <= time(16, 0)
            else "CLOSED"
        )

        # -----------------------------
        # News
        # -----------------------------
        news = []

        try:
            if hasattr(ticker, "news"):
                for item in ticker.news[:5]:
                    news.append(
                        {
                            "title": item.get("title", ""),
                            "publisher": item.get("publisher", ""),
                            "published_at": item.get("providerPublishTime", ""),
                            "url": item.get("link", ""),
                        }
                    )
        except Exception:
            pass

        # -----------------------------
        # Response
        # -----------------------------
        return {
            "company": {
                "symbol": symbol,
                "company": company.get("company"),
                "sector": company.get("sector"),
                "industry": company.get("industry"),
                "country": company.get("country"),
                "website": info.get("website", ""),
            },
            "price": {
                "current_price": quote["price"],
                "previous_close": round(
                    quote["price"] - quote["change"], 2
                ),
                "change": quote["change"],
                "change_percent": quote["change_percent"],
                "currency": info.get("currency", "USD"),
                "market_state": market_state,
            },
            "financials": {
                "market_cap": info.get("marketCap", 0),
                "pe_ratio": info.get("trailingPE"),
                "forward_pe": info.get("forwardPE"),
                "eps": info.get("trailingEps"),
                "beta": info.get("beta"),
                "dividend_yield": info.get("dividendYield"),
                "volume": info.get("volume", 0),
                "average_volume": info.get("averageVolume", 0),
                "week_52_high": info.get("fiftyTwoWeekHigh", 0),
                "week_52_low": info.get("fiftyTwoWeekLow", 0),
            },
            "prediction": prediction,
            "news": news,
        }
        
        
        