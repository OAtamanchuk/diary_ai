from celery import Celery
from app.core.config import settings
import smtplib
from email.mime.text import MIMEText

celery = Celery(
    "tasks",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_BACKEND_URL
)

@celery.task
def send_daily_reminder(email: str):
    msg = MIMEText("Не забудь записати, як минув твій день!")
    msg['Subject'] = "Нагадування: Щоденник"
    msg['From'] = settings.EMAIL_USER
    msg['To'] = email

    with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
        server.send_message(msg)