import { ImageUploader } from "@/components/admin/ImageUploader"
import { ModalDialog } from "@/components/ModalDialog"
import { ImagesBrowser } from "@/components/admin/ImagesBrowser"
import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"

type PostImageSectionProps = {
	image: string
	index: number
}

export function PostImageSection({ image, index }: PostImageSectionProps) {
	const deleteText = useI18n("button.delete")
	const replaceText = useI18n("button.replace")
	const orText = useI18n("label.or")
	const chooseText = useI18n("button.choose")

	const { setLoadedData, lang } = useAdmin()
	const [dialogOpen, setDialogOpen] = useState<number>(-1)

	const open = useCallback(function () {
		setDialogOpen(index)
	}, [setDialogOpen, index])

	const close = useCallback(function () {
		setDialogOpen(-1)
	}, [setDialogOpen])

	const handleDeleteImage = useCallback(function (index: number) {
		return function () {
			setLoadedData(function (prevState) {
				const clone = structuredClone(prevState)
				clone[lang][TransFiles.posts][index].image = ""
				localStorage.setItem(LOADED_DATA, JSON.stringify(clone))
				return clone
			})
		}
	}, [lang, setLoadedData])

	return (
		<>
			{image !== "" ? (
				<>
					<img src={image} alt="" className="rounded max-w-[200px]" />
					<div className="flex gap-3 p-3">
						<button type="button" className="button" onClick={handleDeleteImage(index)}>
							{deleteText}
						</button>
						<button type="button" className="button" onClick={open}>
							{replaceText}
						</button>
					</div>
				</>
			) : (
				<>
					<ImageUploader index={index} />
					<div>{orText}</div>
					<div>
						<button type="button" className="button" onClick={open}>
							{chooseText}
						</button>
					</div>
				</>
			)}
			{dialogOpen > -1 && (
				<ModalDialog open onClose={close}>
					<ImagesBrowser
						index={dialogOpen}
						filename={TransFiles.posts}
						onClose={close}
					/>
				</ModalDialog>
			)}
		</>
	)
}
