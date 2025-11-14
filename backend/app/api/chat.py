from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from jose import jwt, JWTError
from app.core.config import settings
import httpx
import json
import asyncio
from deep_translator import GoogleTranslator
import langdetect

router = APIRouter()

def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload.get("sub")  # user_id
    except JWTError:
        return None

def detect_lang(text: str) -> str:
    try:
        lang = langdetect.detect(text)
        if lang.startswith("uk"):
            return "uk"
        elif lang.startswith("en"):
            return "en"
        else:
            return "en"
    except:
        return "en"


@router.websocket("/chat/ws")
async def chat_websocket(websocket: WebSocket, token: str = Query(None)):
    if not token:
        await websocket.close(code=403)
        return

    user_id = verify_jwt(token)
    if not user_id:
        await websocket.close(code=403)
        return

    await websocket.accept()

    await websocket.send_text(
        "Вітаю! Я твій асистент у щоденнику. Як ти сьогодні почуваєшся?"
    )

    async with httpx.AsyncClient(timeout=120.0) as client:
        while True:
            try:
                user_message = await websocket.receive_text()

                lang = detect_lang(user_message)
                translated_input = (
                    GoogleTranslator(source="uk", target="en").translate(user_message)
                    if lang == "uk" else user_message
                )

                payload = {
                    "model": "mistral",
                    "prompt": f"User: {translated_input}\nAssistant (empathetic, warm, supportive):",
                    "stream": True
                }

                buffer = ""
                async with client.stream("POST", "http://host.docker.internal:11434/api/generate", json=payload) as response:
                    async for line in response.aiter_lines():
                        if not line:
                            continue
                        try:
                            data = json.loads(line)
                            if "response" in data:
                                buffer += data["response"]
                            if data.get("done"):
                                final_text = (
                                    GoogleTranslator(source="en", target="uk").translate(buffer)
                                    if lang == "uk" else buffer
                                )
                                await websocket.send_text(final_text.strip())
                                buffer = ""
                        except json.JSONDecodeError:
                            continue

            except WebSocketDisconnect:
                break
            except Exception as e:
                await websocket.send_text(f"⚠️ Помилка: {str(e)}")
                break
