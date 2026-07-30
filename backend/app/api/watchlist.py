from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.stock_service import StockService


from app.database.database import get_db
from app.models.watchlist import Watchlist
from app.models.user import User
from app.core.dependencies import get_current_user
from app.schemas.watchlist import (
    WatchlistCreate,
    WatchlistResponse,
)

router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"],
)


@router.get("")
def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    watchlist = (
        db.query(Watchlist)
        .filter(Watchlist.user_id == current_user.id)
        .all()
    )

    result = []

    for stock in watchlist:
        current_price = 0
        change = 0
        change_percent = 0

        try:
            details = StockService.get_stock_details(stock.symbol)

            if details and "price" in details:
                price = details["price"]

                current_price = price["current_price"]
                change = price["change"]
                change_percent = price["change_percent"]

        except Exception as e:
            print(f"Error fetching {stock.symbol}: {e}")

        result.append(
            {
                "id": stock.id,
                "symbol": stock.symbol,
                "company": stock.company,
                "current_price": current_price,
                "change": change,
                "change_percent": change_percent,
            }
        )

    return result


@router.post("", response_model=WatchlistResponse)
def add_to_watchlist(
    item: WatchlistCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    symbol = item.symbol.strip().upper()

    existing = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.symbol == symbol,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Stock already in watchlist.",
        )

    stock = Watchlist(
        symbol=symbol,
        company=item.company.strip(),
        user_id=current_user.id,
    )

    db.add(stock)
    db.commit()
    db.refresh(stock)

    return stock


@router.delete("/{symbol}")
def remove_from_watchlist(
    symbol: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    symbol = symbol.strip().upper()

    stock = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.symbol == symbol,
        )
        .first()
    )

    if stock is None:
        raise HTTPException(
            status_code=404,
            detail=f"{symbol} not found in your watchlist.",
        )

    db.delete(stock)
    db.commit()

    return {
        "message": f"{symbol} removed successfully."
    }