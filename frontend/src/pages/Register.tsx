import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const { lang } = useLang()

  const texts = {
    title: lang === 'uk' ? 'Реєстрація' : 'Registration',
    email: 'Email',
    name: lang === 'uk' ? "Ім'я" : 'Name',
    password: lang === 'uk' ? 'Пароль' : 'Password',
    button: lang === 'uk' ? 'Зареєструватися' : 'Sign up',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(email, username, password)
    await login(email, password)
    navigate('/diary')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{texts.title}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={texts.email}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={texts.name}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={texts.password}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-600 text-white rounded"
      >
        {texts.button}
      </button>
    </form>
  )
}
