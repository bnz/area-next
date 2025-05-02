export function SplitSections() {
    return (
        <>
            <section className="py-24 px-6 sm:px-12 bg-gray-100 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
                    <div className="text-left">
                        <h2 className="text-3xl font-bold mb-4">
                            Минимум действий — максимум эффективности
                        </h2>
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
        </>
    )
}
