export function FeaturesGrid() {
    return (
        <section className="py-24 px-6 sm:px-12 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
                <div>
                    <h3 className="text-xl font-medium mb-2">
                        Простота
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Интерфейс, интуитивно понятный врачам и администраторам
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-2">
                        Безопасность
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Конфиденциальность пациентских данных гарантирована
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-2">
                        Скорость
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Обновления отображаются мгновенно на всех устройствах
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-2">
                        Удобство
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Работать с пациентами стало ещё комфортнее
                    </p>
                </div>
            </div>
        </section>
    )
}
