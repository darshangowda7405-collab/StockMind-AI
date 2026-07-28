from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User

from app.core.dependencies import get_current_user

from app.schemas.user import (
    UserRegister,
    UserResponse,
    Token,
)

from app.services.auth_service import (
    register_user,
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# -----------------------
# Register
# -----------------------
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    try:
        return register_user(db, user)

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# -----------------------
# Login
# -----------------------
@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:

        return login_user(
            db,
            form_data.username,
            form_data.password,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )


# -----------------------
# Current User
# -----------------------
@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user