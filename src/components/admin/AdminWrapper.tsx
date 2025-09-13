"use client"

import cx from "classnames"
import { useEffect, useRef, useState } from "react"
import type { AvailableLangs } from "@/lib/i18n"
import { getAdminStorage, saveAdminStore } from "@/components/admin/getAdminStorage"
import { useI18n } from "@/components/I18nProvider"
import { ArrowLeftFromLine, ArrowRightFromLine, Expand, FoldHorizontal, Minimize, X } from "lucide-react"
import { Status } from "@/components/admin/Status"
import { AdminClient } from "@/components/admin/AdminClient"
import { AdminProvider } from "@/components/admin/AdminProvider"
import { LogOut } from "@/components/admin/LogOut"

type AdminWrapperProps = {
	lang: AvailableLangs
}

export function AdminWrapper({ lang }: AdminWrapperProps) {
	const closeText = useI18n("button.close")
	const minimizeText = useI18n("button.minimize")
	const maximizeText = useI18n("button.maximize")
	const moveCenterText = useI18n("button.moveCenter")
	const moveLeftText = useI18n("button.moveLeft")
	const moveRightText = useI18n("button.moveRight")
	const adminPanelText = useI18n("admin.panel")
	const welcomeText = useI18n("welcome")

	const [minimized, setMinimized] = useState(false)
	const [position, setPosition] = useState("right")

	useEffect(function () {
		const parsed = getAdminStorage()
		if (parsed.minimized) {
			setMinimized(parsed.minimized)
		}
		if (parsed.position) {
			setPosition(parsed.position)
		}
	}, [setMinimized, setPosition])

	const nodeRef = useRef<HTMLDivElement | null>(null)

	return (
		<div ref={nodeRef} className={cx(
			"fixed bg-white/90 dark:bg-gray-700/90 backdrop-blur-lg shadow-md rounded-md bottom-3",
			position === "right" ? "right-3" : "left-3",
			!minimized && "top-20 lg:w-2/3 2xl:w-1/2 max-h-[calc(100vh-90px)] overflow-y-auto",
			position === "right" ? "max-lg:left-3"
				: position === "center"
					? "lg:!left-1/2 lg:-translate-x-1/2 max-lg:right-3 lg:right-auto"
					: "max-lg:right-3",
		)}>
			<AdminProvider lang={lang}>
				<div className={cx(
					"p-3 flex items-center gap-3 sticky top-0 z-50",
					"dark:bg-gray-700/75 backdrop-blur-lg rounded-md",
					!minimized && "mb-3",
				)}>
					<h3 className="font-bold text-xl py-1">
						<span className="hidden md:inline">{welcomeText}</span>
						<span className="inline md:hidden">{adminPanelText}</span>
					</h3>
					<Status />
					<button className="button icon" onClick={function () {
						setMinimized(function (prevState) {
							saveAdminStore({ minimized: !prevState })
							return !prevState
						})
					}}>
						{minimized ? (
							<>
								<Expand />
								<span className="hidden md:inline">{maximizeText}</span>
							</>
						) : (
							<>
								<Minimize />
								<span className="hidden md:inline">{minimizeText}</span>
							</>
						)}
					</button>
					<button
						className={cx("button icon", minimized && "hidden")}
						onClick={function () {
							saveAdminStore({ active: false })
							window.location.reload()
						}}
					>
						<X />
						<span className="hidden md:inline">{closeText}</span>
					</button>
					<button
						className={cx("button max-lg:hidden", minimized && "hidden")}
						onClick={function () {
							setPosition(function (prevState) {
								const newPosition = prevState === "right"
									? "center"
									: prevState === "center"
										? "left"
										: prevState === "left" ? "right" : "left"

								saveAdminStore({ position: newPosition })

								return newPosition
							})
						}}
						title={position === "right"
							? moveCenterText
							: position === "center"
								? moveLeftText
								: moveRightText}
					>
						{position === "right"
							? <FoldHorizontal />
							: position === "center"
								? <ArrowLeftFromLine />
								: <ArrowRightFromLine />}
					</button>
					{!minimized && <LogOut />}
				</div>
				<div className={cx(minimized && "hidden")}>
					<AdminClient />
				</div>
			</AdminProvider>
		</div>
	)
}
