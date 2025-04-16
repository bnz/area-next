import { PropsWithChildren } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LangLink } from "@/components/LangLink"
import { LangsSwitcher } from "@/components/LangsSwitcher"

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

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className=" border-b border-b-amber-900 mb-2 flex flex-row justify-between">
            <LangLink href="/" className="p-2">LOGO</LangLink>
            <LangsSwitcher />
        </header>
        {children}
        </body>
        </html>
    )
}
