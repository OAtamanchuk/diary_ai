import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const { lang } = useLang()

  const texts = {
    title: lang === 'uk' ? 'Вхід' : 'Login',
    email: 'Email',
    password: lang === 'uk' ? 'Пароль' : 'Password',
    button: lang === 'uk' ? 'Увійти' : 'Sign in',
    error:
      lang === 'uk' ? 'Невірні дані для входу' : 'Invalid login credentials',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/diary')
    } catch (err: any) {
      alert(texts.error)
    }
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={texts.password}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        {texts.button}
      </button>
    </form>
  )
}
