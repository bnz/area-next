import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { Status } from "@/components/admin/Status"
import { LogOut as LogOutIcon } from 'lucide-react'

export function LogOut({ hideButton }: { hideButton?: boolean }) {
    const logoutText = useI18n("button.logout")
    const welcomeText = useI18n("welcome")

    const { logOut } = useAdmin()

    return (
        <div className="flex flex-row gap-3 mb-3 px-2 py-1 items-center">
            <h3 className="text-xl font-bold">{welcomeText}</h3>
            <Status />
			{!hideButton && (
				<Button className="ml-auto icon" onClick={logOut}>
					<span className="hidden md:inline">{logoutText}</span>
					<LogOutIcon />
				</Button>
			)}
		</div>
	)
}
