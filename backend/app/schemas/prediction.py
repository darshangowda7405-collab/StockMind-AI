from pydantic import BaseModel


class PredictionResponse(BaseModel):
    symbol: str
    company: str
    current_price: float

    prediction: str
    confidence: float

    signal: str
    risk: str

    expected_return: float

    reasons: list[str]