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
            <div className="flex items-center gap-4">
                <LangLink href="/admin" className="hover:underline text-gray-700 dark:text-gray-300">
                    admin
                </LangLink>
                <nav className="hidden sm:flex gap-6 text-sm">
                    <LangLink href="/contacts" className="hover:underline text-gray-700 dark:text-gray-300">
                        {contactsLabel}
                    </LangLink>
                    <LangLink href="/blog" className="hover:underline text-gray-700 dark:text-gray-300">
                        {blogLabel}
                    </LangLink>
                </nav>
                <Suspense fallback={<></>}>
                    <LangsSwitcher />
                </Suspense>
            </div>
        </header>
    )
}
