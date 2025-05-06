import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { useEffect } from "react"

export function FeaturesList() {
	const titleText = useI18n("label.title")
	const descriptionText = useI18n("label.description")

	const { loadedData, updateArrayData, removeFromArrayData, loadData } = useAdmin()

	useEffect(function () {
		void loadData(TransFiles.features)
	}, [loadData])

	const data = loadedData[TransFiles.features]

	return data.map(function ({ title, description }, index) {
		const update = updateArrayData(TransFiles.features, index)

		return (
			<div key={index}
				className="grid grid-cols-[1fr_35px] gap-3 outline-1 outline-gray-300 dark:outline-gray-700 mb-5 p-2 rounded">
				<input type="text" defaultValue={title} placeholder={titleText} name="title"
					onChange={update} />
				<div className="row-span-2 flex items-center justify-center">
					<button className="button" type="button" onClick={function () {
						removeFromArrayData(TransFiles.features, index)
					}}>
						X
					</button>
				</div>
				<textarea rows={1} placeholder={descriptionText} defaultValue={description} name="description"
					onChange={update}></textarea>
			</div>
		)
	})
}
