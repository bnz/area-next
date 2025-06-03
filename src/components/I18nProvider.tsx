"use client"

import { createContext, PropsWithChildren, useContext } from "react"
import type { FeatureItem, PostItem, SplitItem } from "@/components/admin/schemas/schemas"

export type Translations = {
    keys: Record<string, string>
    features: FeatureItem[]
    posts: PostItem[]
    splits: SplitItem[]
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

export function useI18n(key: "features"): FeatureItem[]
export function useI18n(key: "posts"): PostItem[]
export function useI18n(key: "splits"): SplitItem[]
export function useI18n(key: string): string
export function useI18n(key: string): FeatureItem[] | PostItem[] | SplitItem[] | string {
    const context = useContext(I18nContext)

    if (key === "features" || key === "posts") {
        return context[key] ?? `~${key}~`
    }

    return context.keys[key] ?? `~${key}~`
}
