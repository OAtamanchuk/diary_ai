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
    <div className="min-h-screen flex justify-center bg-[#d1c7ff] dark:bg-gray-900 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-[900px] h-[526px] p-6 bg-[#e5dfff] dark:bg-gray-800 border-2 border-[#6765FE] rounded-[20px] shadow-md"
      >
        <h2 className="text-[40px] leading-none font-bold text-center mb-[30px]">{texts.title}</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={texts.email}
            className="w-[820px] h-[74px] text-[28px] leading-none box-border pl-6 mb-6 border border-[#6765FE] rounded-[10px] border-opacity-50 mx-auto block focus:border-black focus:ring-0 focus:outline-none transition-colors duration-150"
          />
          <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={texts.name}
          className="w-[820px] h-[74px] text-[28px] leading-none box-border pl-6 mb-6 border border-[#6765FE] rounded-[10px] border-opacity-50 mx-auto block focus:border-black focus:ring-0 focus:outline-none transition-colors duration-150"
          />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={texts.password}
          className="w-[820px] h-[74px] text-[28px] leading-none box-border pl-6 mb-12 border border-[#6765FE] rounded-[10px] border-opacity-50 mx-auto block focus:border-black focus:ring-0 focus:outline-none transition-colors duration-150"
          />
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-[188px] h-[66px] text-[28px] font-semibold flex items-center justify-center bg-[#6765FE] text-white rounded-[10px] mx-auto"
          >
            {texts.button}
          </button>
        </div>
      </form>
    </div>
  )
}
