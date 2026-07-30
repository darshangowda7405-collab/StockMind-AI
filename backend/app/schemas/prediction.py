from typing import List
from pydantic import BaseModel


class PredictionResponse(BaseModel):
    symbol: str
    current_price: float
    predicted_price: float
    change_percent: float
    signal: str
    confidence: float
    trend: str
    risk: str
    explanation: List[str]