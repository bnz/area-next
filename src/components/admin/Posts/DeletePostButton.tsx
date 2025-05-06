import { ModalDialog } from "@/components/ModalDialog"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"

type DeletePostButtonProps = {
	index: number
}

export function DeletePostButton({ index }: DeletePostButtonProps) {
	const areYouSure = useI18n("areYouSure")
	const cancelText = useI18n("button.cancel")
	const deleteText = useI18n("button.delete")

	const { removeFromArrayData } = useAdmin()
	const [dialogOpen, setDialogOpen] = useState<number>(-1)

	const handleClose = useCallback(function () {
		setDialogOpen(-1)
	}, [setDialogOpen])

	const handleDelete = useCallback(function () {
		removeFromArrayData(TransFiles.posts, index)
		setDialogOpen(-1)
	}, [index, removeFromArrayData, setDialogOpen])

	const handleOpen = useCallback(function () {
		setDialogOpen(index)
	}, [index, setDialogOpen])

	return (
		<>
			<button type="button" className="button" onClick={handleOpen}>
				X
			</button>
			{dialogOpen > -1 && (
				<ModalDialog maxWidth="max-w-xl" open onClose={handleClose}>
					<h5 className="text-gray-800 dark:text-gray-100 text-center p-5">
						{areYouSure}
					</h5>
					<div className="flex justify-center items-center gap-3">
						<button type="button" className="button" onClick={handleClose}>
							{cancelText}
						</button>
						<button type="button" className="button" onClick={handleDelete}>
							{deleteText}
						</button>
					</div>
				</ModalDialog>
			)}
		</>
	)
}
