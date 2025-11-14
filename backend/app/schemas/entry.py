import datetime
from typing import Optional
from pydantic import BaseModel

class EntryCreate(BaseModel):
    text: str
    date: Optional[datetime.date] = None
    lang: str = "en" 

class EntryOut(BaseModel):
    id: int
    text: str
    date: datetime.date
    emotion_label: Optional[str]
    emotion_score: Optional[float]
    advice: Optional[str]
    emoji: Optional[str]
    lang: str

    class Config:
        from_attributes = True
