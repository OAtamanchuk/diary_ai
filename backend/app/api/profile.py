from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.db.session import get_db
from app.models.entry import Entry
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/stats")
def get_stats(period: str = "month", 
              db: Session = Depends(get_db),
              user: User = Depends(get_current_user)):

    now = datetime.utcnow()
    
    if period == "month":
        start_date = now - timedelta(days=30)
    elif period == "year":
        start_date = now - timedelta(days=365)
    else:
        start_date = now - timedelta(days=30)

    entries = (
        db.query(Entry)
        .filter(Entry.user_id == user.id)
        .filter(Entry.date >= start_date.date())
        .all()
    )

    emotions = {}
    for e in entries:
        if e.emotion_label:
            emotions[e.emotion_label] = emotions.get(e.emotion_label, 0) + 1

    return {"period": period, "emotions": emotions}
