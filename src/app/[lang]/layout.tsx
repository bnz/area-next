import { type PropsWithChildren } from "react"
import type { Metadata } from "next"
import { I18nProvider } from "@/components/I18nProvider"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import path from "path"
import fs from "fs"

export const metadata: Metadata = {
    title: "aria site",
    description: "aria site",
}

type Props = PropsWithChildren<{
    params: Promise<{ lang: string }>
}>

export default async function LangLayout({ children, params }: Props) {
    const { lang } = await params

    const commonPath = [process.cwd(), "public", "data", lang]
    const filePathCommon = path.join(...commonPath, "common.json")
    const filePathTranslations = path.join(...commonPath, "translations.json")
    const filePathFeatures = path.join(...commonPath, "features.json")
    const filePathPosts = path.join(...commonPath, "posts.json")

    let translations: Record<string, string> = {}

    try {
        const commonFile = fs.readFileSync(filePathCommon, "utf-8")
        translations = JSON.parse(commonFile) as Record<string, string>

        const translationsFile = fs.readFileSync(filePathTranslations, "utf-8")
        translations = {
            ...translations,
            ...(JSON.parse(translationsFile) as Record<string, string>),
        }

        const featuresFile = fs.readFileSync(filePathFeatures, "utf-8")
        translations = {
            ...translations,
            features: JSON.parse(featuresFile),
        }

        const postsFile = fs.readFileSync(filePathPosts, "utf-8")
        translations = {
            ...translations,
            posts: JSON.parse(postsFile),
        }
    } catch (e) {
        console.warn(`⚠️ Не удалось прочитать файл: ${filePathCommon}`)
    }

    return (
        <I18nProvider translations={translations}>
            <div
                className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-full -mb-[50px]">
                <Header
                    lang={lang}
                    logoLabel={translations["main-logo"]}
                    contactsLabel={translations.contacts}
                    blogLabel={translations.blog}
                />
                <main>
                    {children}
                </main>
                <div className="h-[50px]" />
            </div>
            <Footer />
        </I18nProvider>
    )
}
