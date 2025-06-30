import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"

export function LogOut({ hideButton }: { hideButton?: boolean }) {
    const logoutText = useI18n("button.logout")
    const welcomeText = useI18n("welcome")

    const { logOut } = useAdmin()

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
