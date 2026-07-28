from fastapi import APIRouter, HTTPException

from app.schemas.prediction import PredictionResponse
from app.services.prediction_service import predict_stock

router = APIRouter(
    prefix="/prediction",
    tags=["AI Prediction"]
)


@router.get("/{symbol}", response_model=PredictionResponse)
def get_prediction(symbol: str):

    result = predict_stock(symbol)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Stock not found."
        )

    return result