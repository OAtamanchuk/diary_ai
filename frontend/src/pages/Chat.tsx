import { useEffect, useState } from "react"
import { api } from "../services/api"

export default function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/api/chat/ws")
    socket.onmessage = (msg) => setMessages(m => [...m, msg.data])
    setWs(socket)
    return () => socket.close()
  }, [])

  const send = () => {
    if (ws && input.trim()) {
      ws.send(input)
      setInput("")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">💬 Chat</h1>

      <div className="border p-4 h-80 overflow-y-auto mb-4 bg-white dark:bg-gray-800 rounded">
        {messages.map((m, i) => (
          <p key={i} className="mb-2">{m}</p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  )
}
