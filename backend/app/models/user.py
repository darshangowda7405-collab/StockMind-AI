from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    # Relationship to Watchlist
    watchlist = relationship(
        "Watchlist",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    portfolio = relationship(
        "Portfolio",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    alerts = relationship(
        "Alert",
        back_populates="user",
        cascade="all, delete-orphan",
    )   