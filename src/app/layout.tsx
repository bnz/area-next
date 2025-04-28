import { PropsWithChildren } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import path from "path"
import fs from "fs"
import { I18nProvider } from "@/components/I18nProvider"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "aria site",
    description: "aria site",
}

type RootLayoutProps = Readonly<PropsWithChildren>

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    )
}
