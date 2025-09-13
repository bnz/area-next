import { useAdmin } from "@/components/admin/AdminProvider"
import { ChangeEvent, PropsWithChildren, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function ImageUploader({ id, children }: PropsWithChildren<{ id: string }>) {
    const loadingText = useI18n("loading")
    const uploadText = useI18n("button.upload")
    const cancelText = useI18n("button.cancel")
    const chooseImageText = useI18n("button.uploadImage")

    const { uploadImage, updateArrayData } = useAdmin(TransFiles.posts)

    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<string>('')

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected) {
            setFile(selected)
            const reader = new FileReader()
            reader.onloadend = function () {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selected)
        }
    }

    async function handleUpload() {
        if (!file) return
        setStatus(loadingText)
        try {
            const filename = await uploadImage(file)

            updateArrayData(id)({
                target: {
                    name: "image",
                    value: filename,
                },
            } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)

            setStatus(`Uploaded: /${filename}`)
        } catch (err) {
            console.error(err)
            setStatus('Upload failed')
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center py-1">
            {preview ? (
                <>
                    <img src={preview} alt="preview" className="w-full max-h-[50%] max-w-sm rounded" />
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={!file}
                            className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {uploadText}
                        </button>
                        <button type="button" className="cursor-pointer" onClick={function () {
                            setPreview(null)
                        }}>
                            {cancelText}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <label htmlFor="file" className="button">
                            {chooseImageText}
                        </label>
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    {children}
                </>
            )}
            {status && (
                <p className="text-sm text-gray-500">{status}</p>
            )}
        </div>
    )
}
