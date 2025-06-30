"use client"

import { AvailableLangs } from "@/lib/i18n"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { saveAdminStore } from "@/components/admin/getAdminStorage"

type SetAdminActiveProps = {
    lang: AvailableLangs
}

export function SetAdminActive({ lang }: SetAdminActiveProps) {
    const router = useRouter()

    useEffect(function () {
        saveAdminStore({ active: true })
        router.replace(`/${lang}`)
    }, [lang, router])

    return null
}
