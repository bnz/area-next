import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { ChangeEvent, useCallback, useState } from "react"

export function AddFeatureForm() {
	const addText = useI18n("button.add")
	const titleText = useI18n("label.title")
	const descriptionText = useI18n("label.description")
	const cancelText = useI18n("button.cancel")
	const saveText = useI18n("button.save")

	const [formOpen, setFormOpen] = useState(false)
	const { setLoadedData, lang } = useAdmin()

	const [formData, setFormData] = useState({
		title: "",
		description: "",
	})

	const onFormChange = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setFormData(function (prevState) {
			return {
				...prevState,
				[event.target.name]: event.target.value,
			}
		})
	}, [setFormData])

	const handleClose = useCallback(function () {
		setFormOpen(false)
	}, [setFormOpen])

	const handleOpen = useCallback(function () {
		setFormOpen(true)
	}, [setFormOpen])

	return formOpen ? (
		<form
			className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
			onSubmit={function (event) {
				event.preventDefault()
				setLoadedData(function (prevState) {
					const newState = {
						...prevState,
						[lang]: {
							...prevState[lang],
							[TransFiles.features]: [
								...prevState[lang][TransFiles.features],
								formData,
							],
						},
					}
					localStorage.setItem(LOADED_DATA, JSON.stringify(newState))
					return newState
				})

				handleClose()
			}}
		>
			<input type="text" name="title" placeholder={titleText} autoFocus defaultValue={formData.title}
				onChange={onFormChange} />
			<textarea rows={1} placeholder={descriptionText} defaultValue={formData.description} name="description"
				onChange={onFormChange}></textarea>
			<div className="flex gap-3">
				<button className="button" type="submit">
					{saveText}
				</button>
				<button type="button" className="cursor-pointer" onClick={handleClose}>
					{cancelText}
				</button>
			</div>
		</form>
	) : (
		<button className="button" type="button" onClick={handleOpen}>
			{addText}
		</button>
	)
}
