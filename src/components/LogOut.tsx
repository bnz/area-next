import { useAdmin } from "@/components/AdminProvider"
import { useI18n } from "@/components/I18nProvider"

export function LogOut() {
    const { logOut } = useAdmin()
    const logoutText = useI18n("button.logout")
    const welcomeText = useI18n("welcome")

    return (
        <div className="flex flex-row gap-3 mb-3 px-2">
            <h3 className="text-xl font-bold">{welcomeText}</h3>
            <button type="button" className="button ml-auto" onClick={logOut}>
                {logoutText}
            </button>
        </div>
    )
}
