import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { LogOut as LogOutIcon } from 'lucide-react'

export function LogOut() {
	const logoutText = useI18n("button.logout")

	const { logOut } = useAdmin()

	return (
		<Button className="icon" onClick={logOut}>
			<span className="hidden md:inline">{logoutText}</span>
			<LogOutIcon />
		</Button>
	)
}
