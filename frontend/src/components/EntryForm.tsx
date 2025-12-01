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
    <div className="w-[720px] mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={lang === 'uk' ? "Як минув твій день?" : "How do you feeling today...?"}
        className="w-full p-4 pb-0 h-[220px] border-2 border-[#AC91FF] rounded-[20px]"
        rows={4}
      />
      <div className="flex justify-center mt-4">
        <button onClick={handleSubmit} className="px-8 py-2 bg-[#6765FE] text-white rounded-[10px] hover:bg-[#5f5cf5]">
          {lang === 'uk' ? "Зберегти" : "Save"}
        </button>
      </div>
    </div>
    
  )
}
