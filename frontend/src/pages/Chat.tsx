import { useEffect, useState } from "react"
import { useLang } from "../context/LanguageContext"

type ChatMessage = {
  from: "user" | "bot"
  text: string
}

export default function Chat() {
  const { lang } = useLang()
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    const wsUrl = `ws://localhost:8000/ws?token=${token}&lang=${lang}`
    const socket = new WebSocket(wsUrl)

    socket.onopen = () => console.log("Chat connected")
    socket.onmessage = (e) => {
      setMessages((prev) => [...prev, { from: "bot", text: e.data }])
    }
    socket.onclose = () => console.log("Chat disconnected")

    setWs(socket)
    return () => socket.close()
  }, [lang])  

  const send = () => {
    if (!ws || !input.trim()) return
    setMessages((prev) => [...prev, { from: "user", text: input }])
    ws.send(input)
    setInput("")
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send()
  }

  useEffect(() => {
    const el = document.getElementById("chat-scroll")
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <div className="max-w-5xl mx-auto p-11">
      <h1 className="text-4xl font-bold mb-11 text-center">
        {lang === "uk" ? "Чат" : "Chat"}
      </h1>

      <div
        id="chat-scroll"
        className="border p-4 h-96 overflow-y-auto mb-4 bg-[#E5DFFF] rounded-[20px] dark:bg-gray-800"
      >
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? "text-right mb-2" : "text-left mb-2"}>
            <span
              className={
                m.from === "user"
                  ? "inline-block px-3 py-2 rounded-xl bg-[#6765FE] text-white max-w-[80%] break-words whitespace-pre-wrap"
                  : "inline-block px-3 py-2 rounded-xl bg-[#BDAEFF] dark:bg-gray-700 dark:text-white max-w-[80%] break-words whitespace-pre-wrap"
              }
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 p-2 bg-[#E5DFFF] border border-[#1C0843] rounded-[10px]"
          placeholder={lang === "uk" ? "Напишіть повідомлення..." : "Type a message..."}
        />

        <button onClick={send} className="px-6 py-2 bg-[#6765FE] text-white rounded-[10px]">
          {lang === "uk" ? "Надіслати" : "Send"}
        </button>
      </div>
    </div>
  )
}
