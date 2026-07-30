from fastapi import APIRouter, HTTPException

from app.services.market_service import MarketService
from app.services.stock_service import StockService

router = APIRouter(
    prefix="/stocks",
    tags=["Stocks"],
)


@router.get("/{symbol}")
def stock(symbol: str):
    data = StockService.get_stock_details(symbol.upper())

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Stock not found",
        )

    return data


@router.get("/{symbol}/history")
def history(
    symbol: str,
    period: str = "6mo",
):
    history = MarketService.get_history(
        symbol.upper(),
        period,
    )

    if history is None or history.empty:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    return history.to_dict(orient="records")