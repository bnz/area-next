import { Post, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { ImageSection } from "@/components/admin/ImageSection"
import { DeletePostButton } from "@/components/admin/Posts/DeletePostButton"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { useI18n } from "@/components/I18nProvider"
import { ChangeEvent, useCallback, useEffect } from "react"
import { supportedLanguages } from "@/lib/i18n"

export function PostsList() {
	const urlText = useI18n("label.url")
	const titleText = useI18n("label.title")
	const excerptText = useI18n("label.excerpt")
	const contentText = useI18n("label.content")

	const { loadedData, setLoadedData, loadData, lang, saveToLocalStorage } = useAdmin()

	useEffect(function () {
		void loadData(TransFiles.posts)
	}, [])

	const data = loadedData[TransFiles.posts] || []

	const updateFormItem = useCallback(function (index: number) {
		return function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
			setLoadedData(function (prevState) {
				const clonedState = structuredClone(prevState)
				const keyName = event.target.name as keyof Post

				clonedState[lang][TransFiles.posts][index] = {
					...clonedState[lang][TransFiles.posts][index],
					[keyName]: event.target.value,
				}

				if (keyName === "slug" || keyName === "datetime") {
					supportedLanguages.map(function (restLang) {
						clonedState[restLang][TransFiles.posts][index][keyName] = event.target.value
					})
				}

				saveToLocalStorage(clonedState)

				return clonedState
			})
		}
	}, [setLoadedData, lang])

	return data.map(function ({ slug, title, image, excerpt, content, datetime }, index) {
		const update = updateFormItem(index)

		return (
			<div
				key={index}
				className="grid grid-cols-[2fr_1fr] gap-3 border-b border-gray-200 dark:border-gray-800 py-6 mb-3"
			>
				<input required type="text" placeholder={urlText} defaultValue={slug} name="slug" onChange={update} />
				<div className="rounded row-span-4 flex">
					<div className="flex-1 pr-5">
						<ImageSection
							image={image}
							index={index}
							filename={TransFiles.posts}
						/>
					</div>
					<div>
						<DeletePostButton index={index} />
					</div>
				</div>
				<input required type="text" placeholder={titleText} defaultValue={title} name="title"
					onChange={update} />
				<DateTimeInput name="datetime" onChange={update} defaultValue={datetime} />
				<input required type="text" placeholder={excerptText} defaultValue={excerpt} name="excerpt"
					onChange={update} />
				<textarea required placeholder={contentText} defaultValue={content} name="content"
					onChange={update}></textarea>
			</div>
		)
	})
}
