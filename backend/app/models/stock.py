from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Stock(Base):
    __tablename__ = "stocks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    symbol: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    company_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    sector: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    exchange: Mapped[str] = mapped_column(
        String(50),
        nullable=True,
    )

    current_price: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )