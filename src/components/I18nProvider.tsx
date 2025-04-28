"use client"

import { createContext, PropsWithChildren, useContext } from "react"

const I18nContext = createContext<Record<string, string>>({})

type I18nProviderProps = PropsWithChildren<{
    translations: Record<string, string>
}>

export function I18nProvider({ children, translations }: I18nProviderProps) {
    console.log({ translations })

    return (
        <I18nContext.Provider value={translations}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n(key: string) {
    const context = useContext(I18nContext)

    return context[key] ?? `~${key}~`
}
