import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/diary')
    } catch (err: any) {
      alert('Невірні дані для входу')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Вхід</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-3 border rounded" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className="w-full p-2 mb-3 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Увійти</button>
    </form>
  );
}