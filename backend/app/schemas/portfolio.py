from pydantic import BaseModel


class PortfolioCreate(BaseModel):
    symbol: str
    company: str
    quantity: float
    buy_price: float


class PortfolioResponse(BaseModel):
    id: int
    symbol: str
    company: str
    quantity: float
    buy_price: float

    model_config = {
        "from_attributes": True,
    }