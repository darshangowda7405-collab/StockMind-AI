from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.portfolio import Portfolio
from app.models.user import User
from app.core.dependencies import get_current_user
from app.schemas.portfolio import PortfolioCreate
from app.services.market_service import MarketService
from app.services.prediction_service import PredictionService

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


@router.get("")
def get_portfolio(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    portfolio = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == current_user.id)
        .all()
    )

    result = []

    for item in portfolio:

        current_price = item.buy_price

        try:
            quote = MarketService.get_quote(item.symbol)

            if quote is not None:
                current_price = quote["price"]

        except Exception as e:
            print(f"Error fetching quote for {item.symbol}: {e}")

        investment = item.quantity * item.buy_price
        current_value = item.quantity * current_price
        profit_loss = current_value - investment

        result.append(
            {
                "id": item.id,
                "symbol": item.symbol,
                "company": item.company,
                "quantity": item.quantity,
                "buy_price": item.buy_price,
                "current_price": current_price,
                "investment": investment,
                "current_value": current_value,
                "profit_loss": profit_loss,
                "return_percent": (
                    (profit_loss / investment) * 100
                    if investment > 0
                    else 0
                ),
            }
        )

    return result


@router.post("")
def add_to_portfolio(
    item: PortfolioCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    stock = Portfolio(
        symbol=item.symbol.upper().strip(),
        company=item.company.strip(),
        quantity=item.quantity,
        buy_price=item.buy_price,
        user_id=current_user.id,
    )

    db.add(stock)
    db.commit()
    db.refresh(stock)

    return stock


@router.put("/{portfolio_id}")
def update_portfolio(
    portfolio_id: int,
    item: PortfolioCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    portfolio = (
        db.query(Portfolio)
        .filter(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
        .first()
    )

    if portfolio is None:
        raise HTTPException(
            status_code=404,
            detail="Portfolio item not found.",
        )

    portfolio.symbol = item.symbol.upper().strip()
    portfolio.company = item.company.strip()
    portfolio.quantity = item.quantity
    portfolio.buy_price = item.buy_price

    db.commit()
    db.refresh(portfolio)

    return {
        "id": portfolio.id,
        "symbol": portfolio.symbol,
        "company": portfolio.company,
        "quantity": portfolio.quantity,
        "buy_price": portfolio.buy_price,
    }


@router.delete("/{portfolio_id}")
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    stock = (
        db.query(Portfolio)
        .filter(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
        .first()
    )

    if stock is None:
        raise HTTPException(
            status_code=404,
            detail="Portfolio item not found.",
        )

    db.delete(stock)
    db.commit()

    return {
        "message": "Portfolio item deleted successfully."
    }


# ==========================================================
# AI PORTFOLIO ADVISOR
# ==========================================================

@router.get("/advisor")
def portfolio_advisor(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    portfolio = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == current_user.id)
        .all()
    )

    stocks = []

    buy = 0
    hold = 0
    sell = 0

    total_confidence = 0
    total_change = 0

    for item in portfolio:

        try:
            prediction = PredictionService.predict(item.symbol)

            stocks.append(
                {
                    "symbol": item.symbol,
                    "company": item.company,
                    "prediction": prediction,
                }
            )

            signal = prediction["signal"]

            if signal == "BUY":
                buy += 1
            elif signal == "SELL":
                sell += 1
            else:
                hold += 1

            total_confidence += prediction["confidence"]
            total_change += prediction["change_percent"]

        except Exception as e:
            print(f"Prediction failed for {item.symbol}: {e}")

    count = len(stocks)

    if count == 0:
        return {
            "summary": {
                "overall_signal": "NONE",
                "buy": 0,
                "hold": 0,
                "sell": 0,
                "average_confidence": 0,
                "expected_change": 0,
            },
            "stocks": [],
        }

    avg_confidence = round(total_confidence / count, 2)
    avg_change = round(total_change / count, 2)

    if buy > sell:
        overall = "BUY"
    elif sell > buy:
        overall = "SELL"
    else:
        overall = "HOLD"

    return {
        "summary": {
            "overall_signal": overall,
            "buy": buy,
            "hold": hold,
            "sell": sell,
            "average_confidence": avg_confidence,
            "expected_change": avg_change,
        },
        "stocks": stocks,
    }