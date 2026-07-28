from fastapi import APIRouter

from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import get_dashboard_data

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/market",
    response_model=DashboardResponse,
)
def market_dashboard():
    return get_dashboard_data()