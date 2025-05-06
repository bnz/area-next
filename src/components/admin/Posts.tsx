import { useCallback, useEffect } from "react"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { PublishButton } from "@/components/admin/PublishButton"
import { ImageUploader } from "@/components/admin/ImageUploader"

export function Posts() {
	const { loadData, loadedData, lang, setLoadedData } = useAdmin()

	useEffect(function () {
		void loadData(TransFiles.posts)
	}, [])

	const data = loadedData[TransFiles.posts]

	const handleDelete = useCallback(function (index: number) {
		return function () {
			setLoadedData(function (prevState) {
				const clone = structuredClone(prevState)


				return prevState
			})
		}
	}, [setLoadedData])

	const handleReplace = useCallback(function () {

	}, [])

	return (
		<div className="relative">
			{data.map(function ({ slug, title, image, excerpt, content }, index) {
				return (
					<div
						key={index}
						className="grid grid-cols-[2fr_1fr] gap-3 border-b border-gray-200 dark:border-gray-800 py-6"
					>
						<input
							type="text"
							placeholder="Url"
							defaultValue={slug}
							name="slug"
						/>
						<div className="rounded row-span-4">
							{image ? (
								<>
									<img src={image} alt="" className="rounded max-w-[200px]" />
									<div className="flex gap-3 p-3">
										<button type="button" className="button" onClick={handleDelete(index)}>
											delete
										</button>
										<button type="button" className="button" onClick={handleReplace}>
											replace
										</button>
									</div>
								</>
							) : (
								<>
									<ImageUploader lang={lang} index={index} />
								</>
							)}
						</div>
						<input type="text" placeholder="Title" defaultValue={title} name="title" />
						<input type="text" placeholder="Excerpt" defaultValue={excerpt} name="excerpt" />
						<textarea placeholder="Content" defaultValue={content} name="content"></textarea>
					</div>
				)
			})}
			<PublishButton filename={TransFiles.posts} />
		</div>
	)
}
