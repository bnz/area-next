"use client"

import type { AvailableLangs } from "@/lib/i18n"
import { useEffect, useState } from "react"
import { AdminWrapper } from "@/components/admin/AdminWrapper"
import { getAdminStorage } from "@/components/admin/getAdminStorage"

type AdminWrapperRendererProps = {
    lang: AvailableLangs
}

export function AdminWrapperRenderer({ lang }: AdminWrapperRendererProps) {
    const [active, setActive] = useState(false)

    useEffect(function () {
        const parsed = getAdminStorage()
        if (parsed.active) {
            setActive(true)
        }
    }, [setActive])

    if (!active) {
        return null
    }

    return <AdminWrapper lang={lang} />
}
