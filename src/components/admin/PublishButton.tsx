import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"

type PublishButtonProps = {
    filename: TransFiles
    allLangs?: boolean
}

export function PublishButton({ filename, allLangs }: PublishButtonProps) {
    const { saveData, publishLoading } = useAdmin()
    const loadingText = useI18n("loading")

    return (
        <>
            <div className="text-center">
                <button className="button !bg-green-500" type="button" onClick={async function () {
                    await saveData(filename, allLangs)
                }}>
                    {useI18n("button.publish")}
                </button>
            </div>
            {publishLoading && (
                <div className="absolute -inset-1 bg-gray-100/90 dark:bg-gray-700/90 rounded flex items-center justify-center">
                    {loadingText}
                </div>
            )}
        </>
    )
}
