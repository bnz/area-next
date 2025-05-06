"use client"

import { PropsWithChildren, useEffect, useRef } from "react"
import cx from "classnames"
import { useI18n } from "@/components/I18nProvider"

type ModalDialogProps = PropsWithChildren<{
	open: boolean;
	onClose(): void
	maxWidth?: string
}>

export function ModalDialog({ open, onClose, children, maxWidth = "max-w-4xl" }: ModalDialogProps) {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	useEffect(function () {
		const dialog = dialogRef.current
		if (!dialog) {
			return
		}

		if (open && !dialog.open) {
			dialog.showModal()
		} else if (!open && dialog.open) {
			dialog.close()
		}
	}, [open])

	useEffect(function () {
		const dialog = dialogRef.current
		if (!dialog) {
			return
		}

		function handleClose() {
			return onClose()
		}

		dialog.addEventListener("close", handleClose)

		return function () {
			dialog.removeEventListener("close", handleClose)
		}
	}, [onClose])

	return (
		<dialog
			ref={dialogRef}
			className={cx(
				"dark:backdrop:bg-black/50 backdrop:bg-white/50 rounded-lg p-6 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow",
				"bg-gray-100 dark:bg-gray-700",
				maxWidth
			)}
		>
			<button className="absolute right-0 top-0 cursor-pointer" onClick={onClose}>
				{useI18n("button.close")}
			</button>
			<div>
				{children}
			</div>
		</dialog>
	)
}
