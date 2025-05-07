"use client"

import { createContext, PropsWithChildren, useContext } from "react"
import { Feature, Post, Split } from "@/components/admin/AdminProvider"

export type Translations = {
    keys: Record<string, string>
    features: Feature[]
    posts: Post[]
    splits: Split[]
}

const I18nContext = createContext<Translations>({
    keys: {},
    features: [],
    posts: [],
    splits: [],
})

type I18nProviderProps = PropsWithChildren<{
    translations: Translations
}>

export function I18nProvider({ children, translations }: I18nProviderProps) {
    return (
        <I18nContext.Provider value={translations}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n(key: "features"): Feature[]
export function useI18n(key: "posts"): Post[]
export function useI18n(key: "splits"): Split[]
export function useI18n(key: string): string
export function useI18n(key: string) {
    const context = useContext(I18nContext)

    if (key === "features" || key === "posts") {
        return context[key] ?? `~${key}~`
    }

    return context.keys[key] ?? `~${key}~`
}
