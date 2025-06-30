import { LogOut } from "@/components/admin/LogOut"
import { useI18n } from "@/components/I18nProvider"

export function Loading() {
    return (
        <div className="flex items-center justify-center max-lg:min-h-[300px] lg:min-h-[500px]">
            {useI18n("loading")}
        </div>
    )
}
