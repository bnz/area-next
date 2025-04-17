import Link from "next/link"
import { LangLink } from "@/components/LangLink"
import { LangsSwitcher } from "@/components/LangsSwitcher"

export function Header({ lang }: { lang: string }) {
    return (
        <header className="w-full px-6 py-6 flex justify-between items-center">
            <Link
                href={`/${lang}`}
                className="text-2xl font-semibold tracking-tight hover:opacity-80 transition">
                Arija
            </Link>
            <div className="flex items-center gap-4">
                <nav className="hidden sm:flex gap-6 text-sm">
                    <LangLink href="/contacts" className="hover:underline text-gray-700 dark:text-gray-300">
                        Контакты
                    </LangLink>
                    <LangLink href="/blog" className="hover:underline text-gray-700 dark:text-gray-300">
                        Блог
                    </LangLink>
                </nav>
                <LangsSwitcher />
            </div>
        </header>
    )
}
