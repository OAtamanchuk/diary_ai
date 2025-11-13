from fastapi import APIRouter, WebSocket
import httpx
import json
import asyncio
from deep_translator import GoogleTranslator
import langdetect  # для визначення мови

router = APIRouter()

def detect_lang(text: str) -> str:
    """Визначає мову користувача"""
    try:
        lang = langdetect.detect(text)
        if lang.startswith("uk"):
            return "uk"
        elif lang.startswith("en"):
            return "en"
        else:
            return "en"  # fallback
    except:
        return "en"

@router.websocket("/ws/chat")
async def chat_websocket(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("🤖 Вітаю! Я твій асистент у щоденнику. Як ти сьогодні почуваєшся? / Hello! How are you feeling today?")

    async with httpx.AsyncClient(timeout=120.0) as client:
        while True:
            try:
                user_message = await websocket.receive_text()

                # === 1️⃣ Визначаємо мову ===
                lang = detect_lang(user_message)

                # === 2️⃣ Перекладаємо в англійську (якщо треба) ===
                translated_input = (
                    GoogleTranslator(source="uk", target="en").translate(user_message)
                    if lang == "uk" else user_message
                )

                # === 3️⃣ Генеруємо відповідь через Ollama ===
                payload = {
                    "model": "mistral",  # або "llama3.2", якщо хочеш залишити
                    "prompt": f"User: {translated_input}\nAssistant (empathetic, kind, supportive):",
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
                                # === 4️⃣ Переклад назад українською ===
                                final_text = (
                                    GoogleTranslator(source="en", target="uk").translate(buffer)
                                    if lang == "uk" else buffer
                                )
                                await websocket.send_text(final_text.strip())
                                buffer = ""
                        except json.JSONDecodeError:
                            continue

            except Exception as e:
                await websocket.send_text(f"⚠️ Помилка: {str(e)}")
                await asyncio.sleep(1)
                break
