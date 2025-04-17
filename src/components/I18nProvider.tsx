"use client"

import { createContext, PropsWithChildren, useContext } from "react"

const I18nContext = createContext<Record<string, string>>({})

type I18nProviderProps = PropsWithChildren<{
    value: Record<string, string>
}>

export function I18nProvider({ children, value }: I18nProviderProps) {
    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n(key: string) {
    const context = useContext(I18nContext)

    return context[key] ?? `~${key}~`
}
