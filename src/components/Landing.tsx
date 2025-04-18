import { LandingPosts } from "@/components/LandingPosts"
import { LangLink } from "@/components/LangLink"
import { HeroSection } from "@/components/HeroSection"

export function Landing() {
    return (
        <>
            <HeroSection />

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 sm:px-12 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Простота</h3>
                        <p className="text-gray-600 dark:text-gray-400">Интерфейс, интуитивно понятный врачам и
                            администраторам</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Безопасность</h3>
                        <p className="text-gray-600 dark:text-gray-400">Конфиденциальность пациентских данных
                            гарантирована</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Скорость</h3>
                        <p className="text-gray-600 dark:text-gray-400">Обновления отображаются мгновенно на всех
                            устройствах</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Удобство</h3>
                        <p className="text-gray-600 dark:text-gray-400">Работать с пациентами стало ещё комфортнее</p>
                    </div>
                </div>
            </section>

            <LandingPosts />

            {/* Split Sections */}
            <section className="py-24 px-6 sm:px-12 bg-gray-100 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
                    <div className="text-left">
                        <h2 className="text-3xl font-bold mb-4">Минимум действий — максимум эффективности</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Назначайте приёмы, ведите историю болезни и просматривайте анализы в один клик.
                        </p>
                    </div>
                    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl" />
                </div>
            </section>

            <section className="py-24 px-6 sm:px-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
                    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl" />
                    <div className="text-left">
                        <h2 className="text-3xl font-bold mb-4">Всё под рукой</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Полный доступ к медицинским картам, результатам исследований и коммуникациям с пациентами —
                            в одном окне.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta"
                className="py-20 px-6 sm:px-12 bg-black dark:bg-gray-200 text-gray-100 dark:text-gray-900 text-center">
                <h2 className="text-3xl font-semibold max-w-xl mx-auto">
                    Присоединяйтесь к Arija и сделайте вашу практику цифровой.
                </h2>
                <LangLink
                    href="/contacts"
                    className="mt-8 inline-block px-6 py-3 bg-white text-black dark:bg-gray-950 dark:text-white border border-current rounded-full hover:opacity-90 transition"
                >
                    Записаться на прием
                </LangLink>
            </section>
        </>
    )
}
