import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"
import { PublishButton } from "@/components/admin/PublishButton"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function Trans() {
	const loadingText = useI18n("loading")

	const { loadedData, loadData, updateRecordData } = useAdmin(TransFiles.translations)

	useEffect(function () {
		void loadData()
	}, [loadData])

	if (Object.keys(loadedData).length === 0) {
		return <div className="px-3">{loadingText}</div>
	}

	return (
		<div className="flex flex-col gap-3 relative px-4">
			{Object.keys(loadedData).map(function (key) {
				return (
					<label key={key}>
						<div className="text-xs font-sans">{key}</div>
						<textarea
							rows={1}
							defaultValue={loadedData[key]}
							onChange={updateRecordData(key)}
						/>
					</label>
				)
			})}
			<PublishButton filename={TransFiles.translations} />
		</div>
	)
}
