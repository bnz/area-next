import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { useI18n } from "@/components/I18nProvider"
import { Post } from "@/components/BlogPage"

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

	const { setLoadedData, lang } = useAdmin()
	const [addNew, setAddNew] = useState<boolean>(false)
	const [formData, setFormData] = useState<Post>(formDefaultValue)

	const handleOpen = useCallback(function () {
		setAddNew(true)
	}, [setAddNew])

	const handleCancel = useCallback(function () {
		setAddNew(false)
		setFormData(formDefaultValue)
	}, [setAddNew, setFormData])

	const onFormChange = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setFormData(function (prevState) {
			return {
				...prevState,
				[event.target.name]: event.target.value,
			}
		})
	}, [setFormData])

	const onSubmit = useCallback(function (event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setLoadedData(function (prevState) {
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
			localStorage.setItem(LOADED_DATA, JSON.stringify(newState))
			return newState
		})
		handleCancel()
	}, [handleCancel, setLoadedData, lang, formData])

	return addNew ? (
		<form
			className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
			onSubmit={onSubmit}
		>
			<input autoFocus type="text" placeholder={urlText} name="slug" onChange={onFormChange} />
			<input type="text" placeholder={titleText} name="title" onChange={onFormChange} />
			<DateTimeInput name="datetime" onChange={onFormChange} />
			<input type="text" placeholder={excerptText} name="excerpt" onChange={onFormChange} />
			<textarea placeholder={contentText} name="content" onChange={onFormChange}></textarea>
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
