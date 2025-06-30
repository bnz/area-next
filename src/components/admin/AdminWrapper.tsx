"use client"

import cx from "classnames"
import { useEffect, useState } from "react"
import { Login } from "@/components/admin/Login"
import type { AvailableLangs } from "@/lib/i18n"
import { getAdminStorage, saveAdminStore } from "@/components/admin/getAdminStorage"
import { useI18n } from "@/components/I18nProvider"

type AdminWrapperProps = {
    lang: AvailableLangs
}

export const adminStorage = {
    tab: 0,
}

export function AdminWrapper({ lang }: AdminWrapperProps) {
    const closeText = useI18n("button.close")
    const minimizeText = useI18n("button.minimize")
    const maximizeText = useI18n("button.maximize")

    const [minimized, setMinimized] = useState(false)

    useEffect(function () {
        const parsed = getAdminStorage()
        if (parsed.minimized) {
            setMinimized(parsed.minimized)
        }
    }, [setMinimized])

    return (
        <>
            <div className={cx(
                "fixed bg-white/75 dark:bg-gray-700/75 backdrop-blur-lg",
                "shadow-md",
                "rounded-md",
                minimized ? cx(
                    "right-3 bottom-3",
                ) : cx(
                    "right-3 top-20 lg:w-2/3 xl:w-1/2 2xl:w-1/3 max-lg:left-3 max-h-[calc(100vh-90px)] overflow-y-auto",
                ),
            )}>
                <div className={cx(
                    "p-3",
                    "flex items-center gap-3",
                    "sticky top-0",
                    "z-10",
                    "dark:bg-gray-700/75 backdrop-blur-lg",
                    "rounded-md",
                    !minimized && "mb-3",
                )}>
                    {minimized && (
                        <div className="mr-auto">Admin</div>
                    )}
                    <button className="button" onClick={function () {
                        setMinimized(function (prevState) {
                            const parsed = getAdminStorage()
                            parsed.minimized = !prevState
                            saveAdminStore(parsed)
                            return !prevState
                        })
                    }}>
                        {minimized ? maximizeText : minimizeText}
                    </button>
                    <button className="button" onClick={function () {
                        localStorage.removeItem("admin")
                        window.location.reload()
                    }}>
                        {closeText}
                    </button>
                </div>
                {!minimized && (
                    <Login lang={lang} />
                )}
            </div>
        </>
    )
}
