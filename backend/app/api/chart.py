from fastapi import APIRouter, HTTPException

from app.services.market_service import MarketService

router = APIRouter(
    prefix="/chart",
    tags=["Chart"],
)


@router.get("/{symbol}")
def chart(symbol: str):
    history = MarketService.get_history(symbol.upper())

    if history is None or history.empty:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    history = history.reset_index()

    return history.to_dict(orient="records")