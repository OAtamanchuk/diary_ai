from fastapi import FastAPI
from app.api import auth, entries, chat, profile
from app.db.base import Base
from app.db.session import engine
from app.tasks.celery_app import celery
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Diary")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(entries.router)
app.include_router(profile.router)
app.include_router(chat.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    from celery.schedules import crontab
    celery.conf.beat_schedule = {
        'daily-reminder': {
            'task': 'app.tasks.celery_app.send_daily_reminder',
            'schedule': crontab(hour=20, minute=0),
            'args': ('user@example.com',)
        }
    }