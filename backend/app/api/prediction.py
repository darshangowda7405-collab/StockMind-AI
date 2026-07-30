from fastapi import APIRouter

from app.schemas.prediction import PredictionResponse
from app.services.prediction_service import PredictionService

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"],
)


@router.get(
    "/{symbol}",
    response_model=PredictionResponse,
)
def predict(symbol: str):
    return PredictionService.predict(symbol)