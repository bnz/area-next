import { useI18n } from "@/components/I18nProvider"
import { Loader } from "lucide-react"

export function Loading() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center max-lg:min-h-[300px] lg:min-h-[500px]">
            <Loader size={50} className="text-indigo-800 animate-spin origin-center [animation-duration:3s]" />
            <div>{useI18n("loading")}</div>
        </div>
    )
}
