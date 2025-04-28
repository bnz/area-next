import { ReactNode } from "react"

export default function NotFoundLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
