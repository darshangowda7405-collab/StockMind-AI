from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.portfolio import router as portfolio_router
from app.api.stocks import router as stocks_router
from app.database.base import Base
from app.database.database import engine
# Import models so SQLAlchemy creates tables
from app.api.dashboard import router as dashboard_router
# API Routers
from app.api.prediction import router as prediction_router
from app.api.chart import router as chart_router
from app.api.auth import router as auth_router
from app.api.search import router as search_router
from app.api.watchlist import router as watchlist_router

from app.models import (
    User,
    Stock,
    Watchlist,
    Portfolio,
    Alert,
)
from app.api.alert import router as alert_router


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(stocks_router)
app.include_router(prediction_router)
app.include_router(chart_router)
app.include_router(auth_router)
app.include_router(search_router)
app.include_router(dashboard_router)
app.include_router(watchlist_router)
app.include_router(portfolio_router)
app.include_router(alert_router)


@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "message": "Backend Running 🚀",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }