"use client"

import { AdminProvider } from "@/components/admin/AdminProvider"
import { AdminClient } from "@/components/admin/AdminClient"
import { type AvailableLangs } from "@/lib/i18n"

type LoginProps = {
    lang: AvailableLangs
}

export function Login({ lang }: LoginProps) {
    return (
        <AdminProvider lang={lang}>
            <AdminClient />
        </AdminProvider>
    )
}
