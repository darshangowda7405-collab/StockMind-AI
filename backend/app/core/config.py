from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # -----------------------------
    # Application
    # -----------------------------
    APP_NAME: str = "StockMind AI"
    DEBUG: bool = False

    # -----------------------------
    # Database
    # -----------------------------
    DATABASE_URL: str

    # -----------------------------
    # JWT
    # -----------------------------
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=True,
    )


settings = Settings()