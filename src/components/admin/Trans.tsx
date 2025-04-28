import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useEffect, useState } from "react"
import { useI18n } from "@/components/I18nProvider"
import { sleep } from "@/helpers/sleep"

export function Trans() {
    const { loadedData, loadData, saveData, updateRecordData } = useAdmin()
    const loadingText = useI18n("loading")
    const saveText = useI18n("button.publish")
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        void loadData(TransFiles.translations)
    }, [])

    const data = loadedData[TransFiles.translations]

    if (Object.keys(data).length === 0) {
        return <>{loadingText}</>
    }

    return (
        <form
            className="flex flex-col gap-3 relative"
            onSubmit={async function (event) {
                event.preventDefault()
                setLoading(true)
                await saveData(TransFiles.translations)
                await sleep(1000)
                setLoading(false)
            }}
        >
            {Object.keys(data).map(function (key) {
                return (
                    <textarea
                        key={key}
                        rows={1}
                        defaultValue={data[key]}
                        onChange={updateRecordData(key)}
                        className="min-h-8"
                    />
                )
            })}
            <div>
                <button type="submit" className="button">
                    {saveText}
                </button>
            </div>
            {loading && (
                <div className="absolute -inset-1 bg-gray-100/90 rounded flex items-center justify-center">
                    {loadingText}
                </div>
            )}
        </form>
    )
}
