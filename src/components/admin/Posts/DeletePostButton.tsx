import { ModalDialog } from "@/components/ModalDialog"
import { useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"

type DeletePostButtonProps = {
    id: string
}

export function DeletePostButton({ id }: DeletePostButtonProps) {
    const areYouSure = useI18n("areYouSure")
    const cancelText = useI18n("button.cancel")
    const deleteText = useI18n("button.delete")

    const { removeFromArrayData } = useAdmin(TransFiles.posts)
    const [dialogOpen, setDialogOpen] = useState<string | undefined>(undefined)

    const handleClose = useCallback(function () {
        setDialogOpen(undefined)
    }, [setDialogOpen])

    const handleDelete = useCallback(function () {
        removeFromArrayData(id)
        setDialogOpen(undefined)
    }, [id, removeFromArrayData, setDialogOpen])

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
