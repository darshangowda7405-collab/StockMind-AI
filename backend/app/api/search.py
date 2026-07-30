from fastapi import APIRouter, Query

router = APIRouter(prefix="/search", tags=["Search"])

STOCKS = [
    {"symbol": "AAPL", "company": "Apple Inc."},
    {"symbol": "MSFT", "company": "Microsoft Corporation"},
    {"symbol": "GOOGL", "company": "Alphabet Inc."},
    {"symbol": "AMZN", "company": "Amazon.com Inc."},
    {"symbol": "TSLA", "company": "Tesla Inc."},
    {"symbol": "META", "company": "Meta Platforms Inc."},
    {"symbol": "NVDA", "company": "NVIDIA Corporation"},
    {"symbol": "NFLX", "company": "Netflix Inc."},
    {"symbol": "AMD", "company": "Advanced Micro Devices"},
    {"symbol": "INTC", "company": "Intel Corporation"},
]

@router.get("")
def search_stocks(q: str = Query(..., min_length=1)):
    q = q.lower()

    results = [
        stock
        for stock in STOCKS
        if q in stock["symbol"].lower()
        or q in stock["company"].lower()
    ]

    return results[:10]