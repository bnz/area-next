import Link from "next/link"
import { LangLink } from "@/components/LangLink"
import { LangsSwitcher } from "@/components/LangsSwitcher"
import { Suspense } from "react"

type HeaderProps = {
    lang: string
    logoLabel: string
    contactsLabel: string
    blogLabel: string
}

export function Header({ lang, logoLabel, contactsLabel, blogLabel }: HeaderProps) {
    return (
        <header className="w-full px-6 py-6 flex justify-between items-center">
            <Link
                href={`/${lang}`}
                className="text-2xl font-semibold tracking-tight hover:opacity-80 transition"
            >
                {logoLabel}
            </Link>
            <div className="flex">
                <nav className="flex text-sm mr-2">
                    <LangLink
                        href="/contacts"
                        className="hover:underline text-gray-700 dark:text-gray-300 px-2 flex items-center"
                    >
                        {contactsLabel}
                    </LangLink>
                    <LangLink
                        href="/blog"
                        className="hover:underline text-gray-700 dark:text-gray-300 px-2 flex items-center"
                    >
                        {blogLabel}
                    </LangLink>
                </nav>
                <Suspense fallback={null}>
                    <LangsSwitcher />
                </Suspense>
            </div>
        </header>
    )
}
