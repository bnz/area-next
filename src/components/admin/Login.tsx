"use client"

import { AdminProvider } from "@/components/admin/AdminProvider"
import { AdminClient } from "@/components/admin/AdminClient"
import { type AvailableLangs } from "@/lib/i18n"
import { Suspense } from "react"

type LoginProps = {
    lang: AvailableLangs
}

export function Login({ lang }: LoginProps) {
    return (
        <AdminProvider lang={lang}>
            <Suspense fallback={null}>
                <AdminClient />
            </Suspense>
        </AdminProvider>
    )
}
