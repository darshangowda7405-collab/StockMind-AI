from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister

from app.core.security import (
    hash_password,
    verify_password,
)

from app.core.auth import create_access_token


def register_user(db: Session, user: UserRegister):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise ValueError("Email already registered.")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hash_password(user.password),
        is_active=True,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    email: str,
    password: str,
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        password,
        user.hashed_password,
    ):
        raise ValueError("Invalid email or password.")

    token = create_access_token(
        {
            "sub": user.email,
            "user_id": user.id,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }