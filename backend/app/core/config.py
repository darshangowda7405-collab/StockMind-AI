from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # -----------------------------
    # App Settings
    # -----------------------------
    APP_NAME: str = "StockMind AI"
    DEBUG: bool = True

    # -----------------------------
    # Database
    # -----------------------------
    DATABASE_URL: str

    # -----------------------------
    # JWT Authentication
    # -----------------------------
    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()