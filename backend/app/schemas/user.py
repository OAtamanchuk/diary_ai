from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str = Field(..., min_length=6, max_length=72)

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str

    class Config:
        from_attributes = True