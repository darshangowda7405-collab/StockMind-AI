from pydantic import BaseModel


class AlertCreate(BaseModel):
    symbol: str
    condition: str
    target_price: float


class AlertResponse(BaseModel):
    id: int
    symbol: str
    condition: str
    target_price: float

    class Config:
        from_attributes = True