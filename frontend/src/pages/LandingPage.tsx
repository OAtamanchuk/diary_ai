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
    <div className="min-h-screen bg-[#d1c7ff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      text-gray-800 dark:text-gray-200">

      <section className="text-center pt-24 pb-20 px-4 animate-fadeIn">
        <h1 className="text-8xl leading-[135%] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#1C0843] via-[#6C66FC] to-[#E978C7] mb-5">
          {t.heroTitle}
        </h1>

        <p className="text-[40px] font-semibold mb-11 opacity-90">
          {t.heroSubtitle}
        </p>

        <p className="max-w-[1448px] mx-auto text-4xl opacity-80 mb-[70px]">
          {t.heroText}
        </p>

        <div className="flex justify-center items-center gap-24">
          <Link
            to="/login"
            className="w-[220px] h-[105px] px-2 py-8 leading-none box-border text-[32px] rounded-xl text-white 
            bg-gradient-to-r from-[#ed79c4] via-[#CC70D7] to-[#6765FE] shadow-lg hover:shadow-xl transition-all"
          >
            {t.login}
          </Link>

          <Link
            to="/register"
            className="w-[220px] h-[105px] px-2 py-8 leading-none box-border text-[32px] rounded-xl text-white 
            bg-gradient-to-tl to-[#0800FF] from-30% from-[#6E66FB] to-100% hover:bg-gray-100 
            dark:hover:bg-gray-600 shadow-sm hover:shadow-xl transition-all"
          >
            {t.register}
          </Link>
        </div>
      </section>

      <section className="max-w-[1520px] mx-auto px-6 mt-16">
        <h2 className="text-[64px] font-bold text-center">
          {t.featuresTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-10 gap-x-12 pt-10">

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
              className="w-[706px] h-[294px] p-6 rounded-[40px] bg-[#e5dfff] dark:bg-gray-800 shadow-lg
                  hover:shadow-2xl transform transition-all animate-fadeUp hover:-translate-y-3 hover:z-20"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <f.icon className="h-[72px] w-[62px] text-[#1C0843] mb-8" />
              <h3 className="text-[32px] text-[#1C0843] font-semibold mb-4">{f.title}</h3>
              <p className="text-[26px] text-[#1C0843] opacity-60">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full h-[585px] text-center bg-gradient-to-r from-[#3D35FD] to-[#E978C7] text-white mt-[135px] mb-24 pt-[96px]">
        <HeartIcon className="h-20 w-20 mx-auto opacity-90 animate-pulse mb-9"/>

        <h2 className="text-4xl font-bold mb-5">
          {t.ctaTitle}
        </h2>

        <p className="text-lg mb-10 opacity-90 max-w-xl mx-auto">
          {t.ctaText}
        </p>

        <div className="flex justify-center">
          <Link
            to="/register"
            className="flex justify-center items-center box-border w-[288px] h-24 px-10 py-4 text-[32px] leading-none bg-[#E5DFFF] text-[#4639FA] rounded-xl shadow-lg font-semibold
            hover:scale-105 hover:shadow-xl transition-all"
          >
            {t.getStarted}
          </Link>
        </div>
      </section>
    </div>
  )
}
