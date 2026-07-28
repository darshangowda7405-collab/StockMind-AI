from fastapi import APIRouter, HTTPException

from app.services.stock_service import get_history, get_stock

router = APIRouter(prefix="/stocks", tags=["Stocks"])


@router.get("/{symbol}")
def stock(symbol: str):
    try:
        return get_stock(symbol.upper())
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{symbol}/history")
def history(symbol: str):
    try:
        return get_history(symbol.upper())
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))