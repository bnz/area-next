import { type PropsWithChildren } from "react"
import type { Metadata } from "next"
import { I18nProvider } from "@/components/I18nProvider"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { readDataJSON } from "@/lib/readDataJSON"
import { PageProps } from "@/app/page"
import { AdminWrapperRenderer } from "@/components/admin/AdminWrapperRenderer"

export const metadata: Metadata = {
	title: "aria site",
	description: "aria site",
}

export default async function LangLayout({ children, params }: PropsWithChildren<PageProps>) {
	const { lang } = await params
	const translations = await readDataJSON(lang)

	return (
		<I18nProvider translations={translations}>
			<div
				className="text-gray-900 dark:text-gray-100 flex flex-col min-h-full -mb-[50px]">
				<Header
					lang={lang}
					logoLabel={translations.keys["main-logo"]}
					contactsLabel={translations.keys.contacts}
					blogLabel={translations.keys.blog}
				/>
				<main>
					{children}
				</main>
				<div className="h-[50px]" />
			</div>
			<Footer copyright={translations.keys.copyright} />
			<AdminWrapperRenderer lang={lang} />
		</I18nProvider>
	)
}
