from fastapi import APIRouter

from app.services.stock_service import get_history

router = APIRouter(
    prefix="/chart",
    tags=["Chart"]
)


@router.get("/{symbol}")
def chart(symbol: str):
    return get_history(symbol)