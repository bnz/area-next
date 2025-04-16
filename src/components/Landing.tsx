'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supportedLanguages } from "@/lib/i18n"

export function Landing() {
    const pathname = usePathname()
    const currentLang = pathname.split('/')[1] || 'en'

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 flex flex-col">
            {/* Header */}
            <header
                className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-6">
                    <Link href={`/${currentLang}`} className="text-xl font-bold hover:opacity-80 transition">
                        Arija
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="hidden sm:flex space-x-4">
                        <Link href="#features" className="hover:underline text-gray-700 dark:text-gray-300">
                            Контакты
                        </Link>
                        <Link href="#cta" className="hover:underline text-gray-700 dark:text-gray-300">
                            Блог
                        </Link>
                    </nav>
                    <div className="relative">
                        <select
                            className="bg-transparent border border-gray-400 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200"
                            defaultValue={currentLang}
                            onChange={(e) => {
                                const lang = e.target.value
                                const newPath = pathname.replace(/^\/[^/]+/, '/' + lang)
                                window.location.href = newPath
                            }}
                        >
                            {supportedLanguages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="flex flex-col items-center justify-center flex-1 text-center p-4">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                    Добро пожаловать в <span className="text-emerald-500 dark:text-emerald-300">Arija</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-6">
                    Простой, быстрый и адаптивный лендинг, построенный с современными веб-технологиями
                </p>
                <Link
                    href="#cta"
                    className="bg-emerald-500 dark:bg-emerald-400 text-white px-6 py-3 rounded shadow hover:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                >
                    Попробовать сейчас
                </Link>
            </section>

            {/* Features */}
            <section id="features" className="py-16 bg-gray-100 dark:bg-gray-900 px-6">
                <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-3 text-center">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Быстрый старт</h3>
                        <p className="text-gray-600 dark:text-gray-400">Готов к запуску всего за пару минут</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Гибкий дизайн</h3>
                        <p className="text-gray-600 dark:text-gray-400">Современная, настраиваемая система стилей</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Легко адаптировать</h3>
                        <p className="text-gray-600 dark:text-gray-400">Подходит под любой проект</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="py-16 px-6 bg-emerald-600 dark:bg-emerald-700 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
                <p className="mb-6">Присоединяйтесь сегодня и ускорьте разработку</p>
                <Link
                    href="/admin"
                    className="bg-white text-emerald-600 dark:text-emerald-700 px-6 py-3 rounded font-medium shadow hover:bg-gray-100 dark:hover:bg-gray-200 transition"
                >
                    Перейти в админку
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
                © 2025 Arija. Все права защищены.
            </footer>
        </div>
    )
}
