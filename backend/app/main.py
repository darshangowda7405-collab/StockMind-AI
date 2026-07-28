from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.prediction import router as prediction_router
from app.core.config import settings
from app.database.base import Base
from app.database.database import engine

from app.models import User, Stock
from app.api.stocks import router as stock_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock_router)
app.include_router(prediction_router)


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