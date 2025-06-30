"use client"

import { AvailableLangs } from "@/lib/i18n"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAdminStorage, saveAdminStore } from "@/components/admin/getAdminStorage"

type SetAdminActiveProps = {
    lang: AvailableLangs
}

export function SetAdminActive({ lang }: SetAdminActiveProps) {
    const router = useRouter()

    useEffect(function () {
        const parsed = getAdminStorage()
        parsed.active = true
        saveAdminStore(parsed)
        router.replace(`/${lang}`)
    }, [lang, router])

    return null
}
