import { ModalDialog } from "@/components/ModalDialog"
import { useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { PostItem, TransFiles } from "@/components/admin/schemas/schemas"
import { supportedLanguages } from "@/lib/i18n"

type DeletePostButtonProps = {
	id: string
	callback: VoidFunction
}

export function DeletePostButton({ id, callback }: DeletePostButtonProps) {
	const areYouSure = useI18n("areYouSure")
	const cancelText = useI18n("button.cancel")
	const deleteText = useI18n("button.delete")

	const { setLoadedData, lang, saveToLocalStorage } = useAdmin(TransFiles.posts)
	const [dialogOpen, setDialogOpen] = useState<string | undefined>(undefined)

	const handleClose = useCallback(function () {
		setDialogOpen(undefined)
	}, [setDialogOpen])

	const handleDelete = useCallback(function () {
		setLoadedData(function (prevState) {
			const cloned = structuredClone(prevState)
			const { slug } = cloned[lang][TransFiles.posts].find(function ({ id: _id }) {
				return _id === id
			})
			for (const restLang of supportedLanguages) {
				const index = cloned[restLang][TransFiles.posts].findIndex(function ({ slug: _slug }) {
					return slug === _slug
				})
				if (index > -1) {
					cloned[restLang][TransFiles.posts].splice(index, 1)
				}
			}
			saveToLocalStorage(cloned)
			return cloned
		})

		setDialogOpen(undefined)
		callback()
	}, [id, setLoadedData, lang, setDialogOpen, saveToLocalStorage, callback])

	const handleOpen = useCallback(function () {
		setDialogOpen(id)
	}, [id, setDialogOpen])

	return (
		<>
			<Button className="!bg-red-500" onClick={handleOpen}>
				X
			</Button>
			{dialogOpen !== undefined && (
				<ModalDialog maxWidth="max-w-xl" open onClose={handleClose}>
					<h5 className="text-gray-800 dark:text-gray-100 text-center p-5">
						{areYouSure}
					</h5>
					<div className="flex justify-center items-center gap-3">
						<Button onClick={handleClose}>
							{cancelText}
						</Button>
						<Button className="!bg-red-500" onClick={handleDelete}>
							{deleteText}
						</Button>
					</div>
				</ModalDialog>
			)}
		</>
	)
}
