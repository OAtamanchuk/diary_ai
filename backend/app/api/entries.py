from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db, SessionLocal
from app.schemas.entry import EntryCreate, EntryOut
from app.models.entry import Entry
from app.services.custom_emotion import predict_emotion
from app.core.security import get_current_user
from app.models.user import User
from datetime import date

router = APIRouter(prefix="/entries", tags=["entries"])

def analyze_and_update(entry_id: int, text: str, lang: str) -> None:
    db = SessionLocal()
    try:
        label, score, emoji, advice = predict_emotion(text, lang)
        entry = db.get(Entry, entry_id)
        if entry:
            entry.emotion_label = label
            entry.emotion_score = score
            entry.advice = advice
            entry.emoji = emoji
            db.commit()
    finally:
        db.close()

@router.post("/", response_model=EntryOut)
async def create_entry(
    entry_in: EntryCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    lang = entry_in.lang if entry_in.lang != "auto" else "en"

    # 1️⃣ Анализируем эмоции ДО записи
    label, score, emoji, advice = predict_emotion(entry_in.text, lang)

    # 2️⃣ Создаём запись с уже готовыми эмоциями
    entry = Entry(
        text=entry_in.text,
        date=entry_in.date or date.today(),
        lang=lang,
        user_id=user.id,
        emotion_label=label,
        emotion_score=score,
        advice=advice,
        emoji=emoji
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry


@router.get("/", response_model=list[EntryOut])
def get_entries(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return db.query(Entry).filter(Entry.user_id == user.id).all()

@router.delete("/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    entry = db.query(Entry).filter(Entry.id == entry_id, Entry.user_id == current_user.id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Запис не знайдено")
    db.delete(entry)
    db.commit()
    return {"message": "Запис видалено"}


