import { generateLangStaticParams } from "@/lib/i18n"

export const generateStaticParams = generateLangStaticParams

export default async function Page() {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Контакты</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                Здесь будет информация о контактах
            </p>
        </div>
    )
}
