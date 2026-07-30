from pydantic import BaseModel


class WatchlistCreate(BaseModel):
    symbol: str
    company: str


class WatchlistResponse(BaseModel):
    id: int
    symbol: str
    company: str

    class Config:
        from_attributes = True