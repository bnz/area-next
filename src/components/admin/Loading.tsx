import { LogOut } from "@/components/admin/LogOut"
import { useI18n } from "@/components/I18nProvider"

export function Loading() {
	return (
		<div className="max-w-5xl bg-gray-100 dark:bg-gray-700 rounded py-3 mx-2 lg:mx-auto shadow-xl">
			<LogOut hideButton />
			<div className="flex items-center justify-center min-h-[300px]">
				{useI18n("loading")}
			</div>
		</div>
	)
}
