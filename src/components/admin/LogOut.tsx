import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function LogOut({ hideButton }: { hideButton?: boolean }) {
	const { logOut, areEqual } = useAdmin()
	const logoutText = useI18n("button.logout")
	const welcomeText = useI18n("welcome")

	// console.log("translations", areEqual(TransFiles.translations))
	// console.log("common", areEqual(TransFiles.common))
	// console.log("posts", areEqual(TransFiles.posts))
	// console.log("splits", areEqual(TransFiles.splits))
	// console.log("features", areEqual(TransFiles.features))
	// console.log("--------------------")

	return (
		<div className="flex flex-row gap-3 mb-3 px-2">
			<h3 className="text-xl font-bold">{welcomeText}</h3>
			{!hideButton && (
				<Button className="ml-auto" onClick={logOut}>
					{logoutText}
				</Button>
			)}
		</div>
	)
}
