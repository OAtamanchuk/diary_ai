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
    <div className="min-h-screen flex justify-center bg-[#d1c7ff] dark:bg-gray-900 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-[900px] h-[440px] p-6 bg-[#e5dfff] dark:bg-gray-800 border-2 border-[#6765FE] rounded-[20px] shadow-md"
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
