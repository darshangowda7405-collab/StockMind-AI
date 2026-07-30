from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.core.auth import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    print("\n========== AUTH DEBUG ==========")
    print("Received Token:", token)

    payload = verify_token(token)
    print("Decoded Payload:", payload)

    if payload is None:
        print("❌ Token verification failed")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    email = payload.get("sub")
    print("Email:", email)

    user = db.query(User).filter(User.email == email).first()
    print("User Found:", user)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    print("========== AUTH SUCCESS ==========\n")

    return user