import { LOADED_DATA, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { ChangeEvent, useCallback, useState } from "react"
import { Button, ButtonSimple, ButtonSubmit } from "@/components/admin/Button"
import { makeId } from "@/lib/makeId"
import { FeatureItem, TransFiles } from "@/components/admin/schemas/schemas"

const formDefaultValue: FeatureItem = {
	id: "",
	title: "",
	description: "",
}

export function AddFeatureForm() {
	const addText = useI18n("button.add")
	const titleText = useI18n("label.title")
	const descriptionText = useI18n("label.description")
	const cancelText = useI18n("button.cancel")
	const saveText = useI18n("button.save")

	const [formOpen, setFormOpen] = useState(false)
	const { setLoadedData, lang } = useAdmin()

	const [formData, setFormData] = useState<FeatureItem>({
		...formDefaultValue,
		id: makeId(),
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
			<input
				type="text"
				name="title"
				placeholder={titleText}
				autoFocus
				defaultValue={formData.title}
				onChange={onFormChange}
				required
			/>
			<textarea
				rows={1}
				placeholder={descriptionText}
				defaultValue={formData.description}
				name="description"
				onChange={onFormChange}
				required
			/>
			<div className="flex justify-start gap-3">
				<ButtonSubmit>
					{saveText}
				</ButtonSubmit>
				<ButtonSimple className="cursor-pointer" onClick={function () {
					handleClose()
					setFormData(formDefaultValue)
				}}>
					{cancelText}
				</ButtonSimple>
			</div>
		</form>
	) : (
		<div className="">
			<Button onClick={handleOpen}>
				{addText}
			</Button>
		</div>
	)
}
