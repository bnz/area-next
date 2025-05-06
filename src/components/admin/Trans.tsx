import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"
import { PublishButton } from "@/components/admin/PublishButton"

export function Trans() {
	const { loadedData, loadData, saveData, updateRecordData, publishLoading } = useAdmin()
	const loadingText = useI18n("loading")

	useEffect(function () {
		void loadData(TransFiles.translations)
	}, [])

	const data = loadedData[TransFiles.translations]

	if (Object.keys(data).length === 0) {
		return <>{loadingText}</>
	}

	return (
		<div className="flex flex-col gap-3 relative">
			{Object.keys(data).map(function (key) {
				return (
					<label key={key}>
						<div className="text-xs font-sans">{key}</div>
						<textarea
							rows={1}
							defaultValue={data[key]}
							onChange={updateRecordData(key)}
						/>
					</label>
				)
			})}
			<PublishButton filename={TransFiles.translations} />
		</div>
	)
}
