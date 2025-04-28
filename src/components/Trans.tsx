import { TransFiles, useAdmin } from "@/components/AdminProvider"
import { useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"

export function Trans() {
    const { loadedData, loadData, saveData, updateData } = useAdmin()
    const loadingText = useI18n("loading")
    const saveText = useI18n("button.publish")

    useEffect(function () {
        void loadData(TransFiles.translations)
    }, [])

    const data = loadedData[TransFiles.translations]

    if (Object.keys(data).length === 0) {
        return <>{loadingText}</>
    }

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={async function (event) {
                event.preventDefault()
                await saveData(TransFiles.translations)
            }}>
            {Object.keys(data).map(function (key) {
                return (
                    <textarea
                        key={key}
                        rows={1}
                        defaultValue={data[key]}
                        onChange={updateData(key)}
                        className="min-h-8"
                    />
                )
            })}
            <div>
                <button type="submit" className="button">
                    {saveText}
                </button>
            </div>
        </form>
    )
}
