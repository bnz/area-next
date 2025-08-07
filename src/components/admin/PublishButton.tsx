import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"

type PublishButtonProps = {
	filename: TransFiles
	allLangs?: boolean
}

export function PublishButton({ filename, allLangs }: PublishButtonProps) {
	const loadingText = useI18n("loading")
	const publishText = useI18n("button.publish")

	const { saveData, publishLoading, areEqual, availableStatus } = useAdmin(filename)

	return (
		<>
			<div className="text-center py-10">
				<Button disabled={!availableStatus || areEqual()} className="!bg-green-500" onClick={function () {
					void saveData(allLangs)
				}}>
					{publishText}
				</Button>
			</div>
			{publishLoading && (
				<div className="absolute -inset-1 bg-gray-100/90 dark:bg-gray-700/90 rounded flex items-center justify-center">
					{loadingText}
				</div>
			)}
		</>
	)
}
