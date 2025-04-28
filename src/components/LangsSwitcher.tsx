"use client"

import { supportedLanguages } from "@/lib/i18n"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import cx from "classnames"
import Link from "next/link"
import { useEffect, useState } from "react"

export function LangsSwitcher() {
    const { lang: selectedLang } = useParams()
    const pathname = usePathname()
    const restPathname = pathname.split(`/${selectedLang}`)[1]
    const [search, setSearch] = useState("")
    const searchParams = useSearchParams()

    useEffect(function () {
        setSearch(window.location.search)
    }, [setSearch, searchParams])

    return (
        <ul className="flex flex-row gap-1 px-1 outline-1 rounded-lg">
            {supportedLanguages.map(function (lang) {
                return (
                    <li key={lang} className="flex">
                        <Link
                            href={`/${lang}${restPathname}${search}`}
                            className={cx(lang === selectedLang && "underline", "p-2")}
                        >
                            {lang}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
