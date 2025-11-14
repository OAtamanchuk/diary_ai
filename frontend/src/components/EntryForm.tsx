import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

export default function EntryForm({ onSubmit }: { onSubmit: (text: string, lang: string) => void }) {
  const [text, setText] = useState('')
  const { lang } = useLang()

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text, lang)   
      setText('')
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={lang === 'uk' ? "Як минув твій день?" : "How was your day?"}
        className="w-full p-2 mt-2 border rounded"
        rows={4}
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        {lang === 'uk' ? "Зберегти" : "Save"}
      </button>
    </div>
  )
}
