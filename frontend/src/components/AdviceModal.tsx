import { motion } from "framer-motion"
import { useLang } from '../context/LanguageContext'


export default function AdviceModal({
  advice,
  onClose
}: {
  advice: string
  onClose: () => void
}) {
    const { lang } = useLang()
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-xl text-center"
      >
        <h2 className="text-xl font-bold mb-3">
            {lang === 'uk' ? 'Порада' : 'Advice'}</h2>

        <p className="text-lg mb-6">{advice}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#6765FE] text-white rounded-[10px] hover:bg-[#5f5cf5] text-white"
        >
            {lang === 'uk' ? 'Дякую' : 'Thanks'}
        </button>
      </motion.div>
    </div>
  )
}

