import { PropsWithChildren } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import path from "path"
import fs from "fs"
import { Post } from "@/app/[lang]/blog/BlogPage"
import { I18nProvider } from "@/components/I18nProvider"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "aria site",
    description: "aria site",
}

type RootLayoutProps = Readonly<PropsWithChildren<{
    params: Promise<{ lang: string }>
}>>

export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { lang } = await params

    const filePath = path.join(process.cwd(), "public", "data", lang, "translations.json")

    let translations: Record<string, string> = {}

    try {
        const file = fs.readFileSync(filePath, "utf-8")
        translations = JSON.parse(file) as Record<string, string>
    } catch (e) {
        console.warn(`⚠️ Не удалось прочитать файл: ${filePath}`)
    }

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider value={translations}>
            <div
                className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-full -mb-[50px]">
                <Header lang={lang} />
                <main>
                    {children}
                </main>
                <div className="h-[50px]" />
            </div>
            <Footer />
        </I18nProvider>
        </body>
        </html>
    )
}
