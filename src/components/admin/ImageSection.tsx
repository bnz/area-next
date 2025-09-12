import { ImageUploader } from "@/components/admin/ImageUploader"
import { ModalDialog } from "@/components/ModalDialog"
import { ImagesBrowser } from "@/components/admin/ImagesBrowser"
import { useAdmin } from "@/components/admin/AdminProvider"
import { useCallback, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"
import Image from "next/image"

type PostImageSectionProps = {
    id: string
    image: string
    index: number
    filename: TransFiles.posts | TransFiles.splits
}

export function ImageSection({ id, image, filename }: PostImageSectionProps) {
    const deleteText = useI18n("button.delete")
    const replaceText = useI18n("button.replace")
    const orText = useI18n("label.or")
    const chooseText = useI18n("button.choose")

    const { updateImage } = useAdmin(filename)
    const [dialogOpen, setDialogOpen] = useState<string | undefined>()

    const open = useCallback(function () {
        setDialogOpen(id)
    }, [setDialogOpen, id])

    const close = useCallback(function () {
        setDialogOpen(undefined)
    }, [setDialogOpen])

    const handleDeleteImage = useCallback(function () {
        void updateImage(id, "")
    }, [updateImage, id])

    return (
        <>
            {image !== "" ? (
                <>
                    <Image width={100} height={100} src={image} alt="" className=" w-full rounded max-w-[200px] mb-3" />
                    <div className="flex gap-3">
                        <Button onClick={handleDeleteImage} className="hover:!bg-red-500">
                            {deleteText}
                        </Button>
                        <Button onClick={open}>
                            {replaceText}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <ImageUploader id={id} />
                    <div>{orText}</div>
                    <div>
                        <Button onClick={open}>
                            {chooseText}
                        </Button>
                    </div>
                </>
            )}
            {dialogOpen !== undefined && (
                <ModalDialog open onClose={close}>
                    <ImagesBrowser
                        id={dialogOpen}
                        filename={filename}
                        onClose={close}
                    />
                </ModalDialog>
            )}
        </>
    )
}
