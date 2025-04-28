import { TransFiles, useAdmin } from "@/components/AdminProvider"
import { ChangeEvent, useCallback, useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"

export function Trans() {
    const { loadedData, loadData, setLoadedData } = useAdmin()
    const loadingText = useI18n("loading")
    const saveText = useI18n("button.save")

    useEffect(function () {
        void loadData(TransFiles.translations)
    }, [])

    const data = loadedData[TransFiles.translations]

    const onChange = useCallback(function (key: string) {
        return function (event: ChangeEvent<HTMLTextAreaElement>) {
            setLoadedData(function (prevState) {
                const editable = structuredClone(prevState[TransFiles.translations])
                editable[key] = event.target.value
                return {
                    ...prevState,
                    ...editable,
                }
            })
        }
    }, [setLoadedData])

    if (Object.keys(data).length === 0) {
        return <>{loadingText}</>
    }

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={function (event) {
                event.preventDefault()
                console.log("submit")
            }}>
            {Object.keys(data).map(function (key) {
                return (
                    <textarea key={key} rows={1} defaultValue={data[key]} onChange={onChange(key)} />
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
