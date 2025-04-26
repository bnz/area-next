"use client"

import { AdminProvider } from "@/components/AdminProvider"
import { AdminClient } from "@/components/AdminClient"

type LoginProps = {
    lang: string
}

export function Login({ lang }: LoginProps) {
    return (
        <AdminProvider lang={lang}>
            <AdminClient lang={lang} />
        </AdminProvider>
    )
}
