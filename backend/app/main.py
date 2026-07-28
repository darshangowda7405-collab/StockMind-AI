from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.database.base import Base
from app.database.database import engine

# Import models so SQLAlchemy creates tables
from app.models import User, Stock

# API Routers
from app.api.stocks import router as stock_router
from app.api.prediction import router as prediction_router
from app.api.chart import router as chart_router
from app.api.auth import router as auth_router

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
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(stock_router)
app.include_router(prediction_router)
app.include_router(chart_router)
app.include_router(auth_router)


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