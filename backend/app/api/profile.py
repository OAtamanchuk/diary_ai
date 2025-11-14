from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.entry import Entry
from typing import List

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    entries = db.query(Entry).filter(Entry.user_id == user.id).all()
    total = len(entries)
    emotions = {}
    for e in entries:
        if e.emotion_label:
            emotions[e.emotion_label] = emotions.get(e.emotion_label, 0) + 1

    return {
        "total_entries": total,
        "emotions": emotions,
        "streak": 7 
    }