from typing import List


class AdvisorService:

    @staticmethod
    def generate(
        current_price: float,
        predicted_price: float,
        rsi: float,
        macd: float,
        macd_signal: float,
        sma20: float,
        sma50: float,
        volatility: float,
    ) -> List[str]:

        reasons = []

        # RSI
        if rsi > 70:
            reasons.append("RSI indicates the stock is overbought.")
        elif rsi < 30:
            reasons.append("RSI indicates the stock is oversold.")
        else:
            reasons.append("RSI is in the neutral zone.")

        # MACD
        if macd > macd_signal:
            reasons.append("MACD is bullish.")
        else:
            reasons.append("MACD is bearish.")

        # Moving averages
        if sma20 > sma50:
            reasons.append("Short-term trend is stronger than the long-term trend.")
        else:
            reasons.append("Long-term trend is currently stronger.")

        # Volatility
        if volatility > 0.03:
            reasons.append("Market volatility is currently high.")
        else:
            reasons.append("Market volatility is relatively low.")

        # Prediction
        if predicted_price > current_price:
            reasons.append("The model predicts an upward move.")
        else:
            reasons.append("The model predicts a downward move.")

        return reasons