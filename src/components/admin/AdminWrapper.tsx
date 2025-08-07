"use client"

import cx from "classnames"
import { useEffect, useState } from "react"
import { Login } from "@/components/admin/Login"
import type { AvailableLangs } from "@/lib/i18n"
import { getAdminStorage, saveAdminStore } from "@/components/admin/getAdminStorage"
import { useI18n } from "@/components/I18nProvider"
import { ArrowLeftFromLine, ArrowRightFromLine, Expand, FoldHorizontal, Minimize, X } from "lucide-react"

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

	return (
		<>
			<div className={cx(
				"fixed bg-white/90 dark:bg-gray-700/90 backdrop-blur-lg",
				"shadow-md",
				"rounded-md",
				position === "right" ? "right-3" : "left-3",
				minimized ? cx(
					"bottom-3",
				) : cx(
					"top-20 lg:w-2/3 2xl:w-1/2 max-h-[calc(100vh-90px)] overflow-y-auto",
				),
				position === "right" ? "max-lg:left-3"
					: position === "center" ? "lg:!left-1/2 lg:-translate-x-1/2 max-lg:right-3 lg:right-auto"
						: "max-lg:right-3",
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
					<h3 className="font-bold text-xl mr-auto">{adminPanelText}</h3>
					<button className="button icon" onClick={function () {
						setMinimized(function (prevState) {
							saveAdminStore({ minimized: !prevState })
							return !prevState
						})
					}}>
						{minimized ? (
							<>
								<Expand />
								{maximizeText}
							</>
						) : (
							<>
								<Minimize />
								{minimizeText}
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
						{closeText}
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
				</div>
				<div className={cx(minimized && "hidden")}>
					<Login lang={lang} />
				</div>
			</div>
		</>
	)
}
