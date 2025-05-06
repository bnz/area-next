import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { ChangeEvent, useEffect, useState } from "react"

export function ImageUploader({ index }: { index: number }) {
	const { uploadImage, updateArrayData } = useAdmin()

	const [preview, setPreview] = useState<string | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [status, setStatus] = useState<string>('')

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0]
		if (selected) {
			setFile(selected)
			const reader = new FileReader()
			reader.onloadend = () => setPreview(reader.result as string)
			reader.readAsDataURL(selected)
		}
	}

	async function handleUpload() {
		if (!file) return
		setStatus('Loading...')
		try {
			const filename = await uploadImage(file)

			updateArrayData(TransFiles.posts, index)({
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
		<div className="flex flex-col gap-4">
			<input type="file" accept="image/*" onChange={handleFileChange} />
			{preview && (
				<img src={preview} alt="preview" className="w-full max-w-sm rounded border" />
			)}
			<button
				onClick={handleUpload}
				disabled={!file}
				className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
			>
				Загрузить
			</button>
			{status && (
				<p className="text-sm text-gray-500">{status}</p>
			)}
		</div>
	)
}
