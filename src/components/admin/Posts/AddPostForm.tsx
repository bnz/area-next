import { type FormEvent, useCallback, useState } from "react"
import { Post, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { useI18n } from "@/components/I18nProvider"
import { supportedLanguages } from "@/lib/i18n"
import { useFormData } from "@/lib/useFormData"

const formDefaultValue: Post = {
	slug: "",
	title: "",
	image: "",
	excerpt: "",
	content: "",
	datetime: "",
}

export function AddPostForm() {
	const addText = useI18n("button.add")
	const cancelText = useI18n("button.cancel")
	const saveText = useI18n("button.save")
	const urlText = useI18n("label.url")
	const titleText = useI18n("label.title")
	const excerptText = useI18n("label.excerpt")
	const contentText = useI18n("label.content")
	const slugUniquerText = useI18n("error.message.slug.uniquer")

	const { loadedData, setLoadedData, lang, saveToLocalStorage } = useAdmin()
	const [addNew, setAddNew] = useState<boolean>(false)
	const [formData, onFormChange, resetFormData] = useFormData<Post>(formDefaultValue)

	const [formErrors, setFormErrors] = useState<Partial<Record<keyof Post, string>>>({})

	const handleOpen = useCallback(function () {
		setAddNew(true)
	}, [setAddNew])

	const handleCancel = useCallback(function () {
		setAddNew(false)
		resetFormData()
	}, [setAddNew, resetFormData])

	const onSubmit = useCallback(function (event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const existingSlugs = loadedData[TransFiles.posts].map(function ({ slug }) {
			return slug
		})

		if (existingSlugs.includes(formData.slug)) {
			setFormErrors({ slug: slugUniquerText })
			return
		}

		setLoadedData(function (prevState) {
			const restLangs = supportedLanguages.filter(function (l) {
				return l !== lang
			})

			const newState = {
				...prevState,
				[lang]: {
					...prevState[lang],
					[TransFiles.posts]: [
						...prevState[lang][TransFiles.posts],
						formData,
					],
				},
			}

			const newIndex = newState[lang][TransFiles.posts].length - 1

			let clonedState = structuredClone(newState)

			restLangs.map(function (restLang) {
				if (clonedState[restLang][TransFiles.posts][newIndex]) {
					clonedState[restLang][TransFiles.posts][newIndex].slug = formData.slug
					clonedState[restLang][TransFiles.posts][newIndex].datetime = formData.datetime
				} else {
					clonedState[restLang][TransFiles.posts][newIndex] = {
						slug: formData.slug,
						datetime: formData.datetime,
						image: "",
						content: "",
						excerpt: "",
						title: "",
					}
				}
			})

			saveToLocalStorage(clonedState)

			return clonedState
		})
		handleCancel()
	}, [loadedData, handleCancel, setLoadedData, lang, formData, saveToLocalStorage, setFormErrors, slugUniquerText])

	return addNew ? (
		<form
			className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
			onSubmit={onSubmit}
		>
			<input required={false} autoFocus type="text" placeholder={urlText} name="slug" onChange={onFormChange} />
			{formErrors.slug && (
				<div className="text-red-500 italic">{formErrors.slug}</div>
			)}
			<input required={false} type="text" placeholder={titleText} name="title" onChange={onFormChange} />
			<DateTimeInput name="datetime" onChange={onFormChange} />
			<input required={false} type="text" placeholder={excerptText} name="excerpt" onChange={onFormChange} />
			<textarea required={false} placeholder={contentText} name="content" onChange={onFormChange}></textarea>
			<div className="flex gap-3">
				<button className="button" type="submit">
					{saveText}
				</button>
				<button type="button" className="cursor-pointer" onClick={handleCancel}>
					{cancelText}
				</button>
			</div>
		</form>
	) : (
		<button type="button" className="button" onClick={handleOpen}>
			{addText}
		</button>
	)
}
