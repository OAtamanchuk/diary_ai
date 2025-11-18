from fastapi import APIRouter, WebSocket
import httpx
import json
from deep_translator import GoogleTranslator
import langdetect

router = APIRouter()


def detect_lang(text: str):
    """Визначає мову користувача."""
    try:
        lang = langdetect.detect(text)
        return "uk" if lang.startswith("uk") else "en"
    except:
        return "uk"


def short_text(text: str, limit=220):
    """Обрізання відповіді моделі, щоб не писала простирадла."""
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0] + "..."


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    token = websocket.query_params.get("token")
    page_lang = websocket.query_params.get("lang", "uk")  # <-- язык страницы

    if not token:
        await websocket.close()
        return

    await websocket.accept()

    greeting = "Вітаю! Я твій асистент. Як ти сьогодні почуваєшся?" if page_lang == "uk" \
        else "Hello! I'm your assistant. How are you feeling today?"

    await websocket.send_text(greeting)

    async with httpx.AsyncClient(timeout=60.0) as client:
        while True:
            try:
                user_msg = await websocket.receive_text()

                # авто-визначення мови повідомлення
                msg_lang = detect_lang(user_msg)

                # переклад → англійською (якщо треба)
                if msg_lang == "uk":
                    translated = GoogleTranslator(source="uk", target="en").translate(user_msg)
                else:
                    translated = user_msg

                # строгий промпт для моделі
                system_instruction = (
                    "You are an empathetic but concise assistant. "
                    "Always respond in ENGLISH only. "
                    "Do NOT use markers like 'User:' or 'Assistant:'. "
                    "Keep responses short, supportive."
                    "Do not give medical advicess, but just be empathetic, like a friend or trusted person."
                )

                payload = {
                    "model": "mistral",
                    "prompt": f"{system_instruction}\nUser message: {translated}\nAssistant:",
                    "stream": False
                }

                r = await client.post("http://host.docker.internal:11434/api/generate", json=payload)
                raw = r.json().get("response", "").strip()

                # обрізаємо занадто довгі відповіді
                #raw = short_text(raw)

                # переклад назад у мову сторінки
                if page_lang == "uk":
                    final_text = GoogleTranslator(source="en", target="uk").translate(raw)
                else:
                        final_text = raw

                await websocket.send_text(final_text)

            except Exception:
                break