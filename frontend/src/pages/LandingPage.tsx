import { Link, Navigate } from "react-router-dom"
import { useLang } from "../context/LanguageContext"
import { useAuth } from "../hooks/useAuth"
import {
  SparklesIcon,
  ChartPieIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CalendarDaysIcon,
  HeartIcon
} from "@heroicons/react/24/solid"

export default function LandingPage() {
  const { user } = useAuth()
  const { lang } = useLang()

  if (user) return <Navigate to="/diary" />

  const t = {
    heroTitle: lang === "uk" ? "Flowly" : "Flowly",
    heroSubtitle:
      lang === "uk"
        ? "Твій простір для усвідомленості та емоційної рівноваги."
        : "Your space for awareness and emotional balance.",
    heroText:
      lang === "uk"
        ? "Записуй свої думки, відстежуй настрій, отримуй підтримку та поради - штучний інтелект завжди поруч."
        : "Write your thoughts, track your mood, receive support and insights - AI is by your side.",

    login: lang === "uk" ? "Увійти" : "Login",
    register: lang === "uk" ? "Реєстрація" : "Register",

    featuresTitle: lang === "uk" ? "Що ти отримаєш?" : "What you get",

    f1: lang === "uk" ? "Розумний аналіз емоцій" : "Smart emotion analysis",
    f1d:
      lang === "uk"
        ? "AI визначає твою емоцію і створює м’яку персональну пораду."
        : "AI detects your emotion and creates gentle personalized advice.",

    f2: lang === "uk" ? "Календар настрою" : "Mood calendar",
    f2d:
      lang === "uk"
        ? "Емодзі щодня показують, що ти відчував протягом місяця."
        : "Emojis mark each day, showing your emotional journey.",

    f3: lang === "uk" ? "Статистика настрою" : "Mood statistics",
    f3d:
      lang === "uk"
        ? "Кольорові графіки показують твої емоційні патерни."
        : "Detailed charts visualize your emotional patterns.",

    f4: lang === "uk" ? "Емпатичний чат" : "Empathetic chat",
    f4d:
      lang === "uk"
        ? "Поговори з доброзичливим ботом, який підтримує."
        : "Talk with a kind supportive AI companion.",

    ctaTitle:
      lang === "uk" ? "Готовий подбати про себе?" : "Ready to take care of yourself?",
    ctaText:
      lang === "uk"
        ? "Перший крок до емоційного благополуччя — тут."
        : "The first step toward well-being starts here.",

    getStarted: lang === "uk" ? "Почати" : "Get Started",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      text-gray-800 dark:text-gray-200">

      {/* HERO */}
      <section className="text-center pt-24 pb-20 px-4 animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          {t.heroTitle}
        </h1>

        <p className="text-2xl font-semibold mb-4 opacity-90">
          {t.heroSubtitle}
        </p>

        <p className="max-w-2xl mx-auto text-lg opacity-80 mb-10">
          {t.heroText}
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="px-8 py-3 text-lg rounded-xl text-white 
            bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all"
          >
            {t.login}
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 text-lg rounded-xl 
            bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 
            dark:hover:bg-gray-600 shadow-sm transition-all"
          >
            {t.register}
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        <h2 className="text-4xl font-bold text-center mb-6">
          {t.featuresTitle}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">

          {/* Feature card */}
          {[
            {
              icon: SparklesIcon,
              title: t.f1,
              text: t.f1d
            },
            {
              icon: CalendarDaysIcon,
              title: t.f2,
              text: t.f2d
            },
            {
              icon: ChartPieIcon,
              title: t.f3,
              text: t.f3d
            },
            {
              icon: ChatBubbleOvalLeftEllipsisIcon,
              title: t.f4,
              text: t.f4d
            }
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg 
              hover:shadow-2xl hover:-translate-y-1 transition-all animate-fadeUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <f.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="opacity-80">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-10">
        <HeartIcon className="h-16 w-16 mx-auto opacity-90 mb-4 animate-pulse" />

        <h2 className="text-4xl font-bold mb-4">
          {t.ctaTitle}
        </h2>

        <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
          {t.ctaText}
        </p>

        <Link
          to="/register"
          className="px-10 py-4 text-xl bg-white text-blue-700 rounded-xl shadow-lg font-semibold
          hover:scale-105 hover:shadow-xl transition-all"
        >
          {t.getStarted}
        </Link>
      </section>
    </div>
  )
}
