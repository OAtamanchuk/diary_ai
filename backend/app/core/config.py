from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Diary"
    DATABASE_URL: str = "postgresql://user:password@db:5432/diary"
    SECRET_KEY: str = "change-in-production-very-long-random-string-2025"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    MODEL_EN_DIR: str = "/app/models/hybrid_en"
    MODEL_UK_DIR: str = "/app/models/hybrid_ua"

    OLLAMA_BASE_URL: str = "http://ollama:11434"
    CELERY_BROKER_URL: str = "redis://redis:6379/0"
    CELERY_BACKEND_URL: str = "redis://redis:6379/1"

    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    EMAIL_USER: str = "your@gmail.com"
    EMAIL_PASSWORD: str = "app-password"

    class Config:
        env_file = ".env"

settings = Settings()