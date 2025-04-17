"use client"

import { useI18n } from "@/components/I18nProvider"
import { LangLink } from "@/components/LangLink"

export function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center flex-1 text-center px-6 sm:px-12 py-24">
            <h1 className="text-3xl sm:text-7xl font-semibold max-w-4xl leading-tight">
                {useI18n("text.main.header")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mt-6">
                {useI18n("text.main.subHeader")}
            </p>
            <LangLink
                href="/contacts"
                className="mt-10 text-base px-6 py-3 bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded-full hover:opacity-90 transition"
            >
                {useI18n("button.contacts.header")}
            </LangLink>
        </section>
    )
}
