from fastapi import APIRouter, HTTPException

from app.services.market_service import MarketService
from app.services.stock_service import StockService
from fastapi.encoders import jsonable_encoder
import numpy as np
import pandas as pd

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

    # Replace invalid float values
    history = history.replace([np.inf, -np.inf], np.nan)
    history = history.astype(object)
    history = history.where(pd.notna(history), None)
    
    print(history.isna().sum())
    print(history.dtypes)
    
    

    import math

    records = history.to_dict(orient="records")

    print("\n========== CHECKING RECORDS ==========")

    bad_found = False

    for i, row in enumerate(records):
        for key, value in row.items():
            if isinstance(value, float):
                if math.isnan(value):
                    print(f"NaN  -> Row {i}, Column {key}")
                    bad_found = True
                elif math.isinf(value):
                    print(f"INF  -> Row {i}, Column {key}, Value={value}")
                    bad_found = True

    if not bad_found:
        print("No NaN or Infinity found in records.")

    print("=====================================\n")

    return records