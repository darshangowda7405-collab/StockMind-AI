from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.alert import Alert
from app.models.user import User
from app.schemas.alert import AlertCreate, AlertResponse

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


@router.get("", response_model=list[AlertResponse])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Alert)
        .filter(Alert.user_id == current_user.id)
        .all()
    )


@router.post("", response_model=AlertResponse)
def create_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_alert = Alert(
        symbol=alert.symbol.upper(),
        condition=alert.condition,
        target_price=alert.target_price,
        user_id=current_user.id,
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return new_alert


@router.delete("/{alert_id}")
def delete_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    alert = (
        db.query(Alert)
        .filter(
            Alert.id == alert_id,
            Alert.user_id == current_user.id,
        )
        .first()
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    db.delete(alert)
    db.commit()

    return {
        "message": "Alert deleted successfully."
    }