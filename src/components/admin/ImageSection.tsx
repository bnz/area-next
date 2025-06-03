import { ImageUploader } from "@/components/admin/ImageUploader"
import { ModalDialog } from "@/components/ModalDialog"
import { ImagesBrowser } from "@/components/admin/ImagesBrowser"
import { LOADED_DATA, useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"

type PostImageSectionProps = {
	image: string
	index: number
	filename: TransFiles.posts | TransFiles.splits
}

export function ImageSection({ image, index, filename }: PostImageSectionProps) {
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
				clone[lang][filename][index].image = ""
				localStorage.setItem(LOADED_DATA, JSON.stringify(clone))
				return clone
			})
		}
	}, [lang, setLoadedData, filename])

	return (
		<>
			{image !== "" ? (
				<>
					<img src={image} alt="" className="rounded max-w-[200px] mb-3" />
					<div className="flex gap-3 justify-center">
						<Button onClick={handleDeleteImage(index)} className="hover:!bg-red-500">
							{deleteText}
						</Button>
						<Button onClick={open}>
							{replaceText}
						</Button>
					</div>
				</>
			) : (
				<>
					<ImageUploader index={index} />
					<div>{orText}</div>
					<div>
						<Button onClick={open}>
							{chooseText}
						</Button>
					</div>
				</>
			)}
			{dialogOpen > -1 && (
				<ModalDialog open onClose={close}>
					<ImagesBrowser
						index={dialogOpen}
						filename={filename}
						onClose={close}
					/>
				</ModalDialog>
			)}
		</>
	)
}
