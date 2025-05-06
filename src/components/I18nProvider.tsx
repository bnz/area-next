"use client"

import { createContext, PropsWithChildren, useContext } from "react"
import { Feature } from "@/components/admin/AdminProvider"
import { Post } from "@/components/BlogPage"

export type Translations = {
	[key: string]: string
	features: Feature[]
	posts: Post[]
}

const I18nContext = createContext<Translations>({})

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

export function useI18n(key: string) {
	const context = useContext(I18nContext)

	return context[key] ?? `~${key}~`
}
