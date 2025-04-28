import { TransFiles, useAdmin } from "@/components/AdminProvider"
import { ChangeEvent, useCallback, useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"

import debounce from "lodash.debounce"

export function Trans() {
    const { loadedData, loadData, setLoadedData, saveData, lang } = useAdmin()
    const loadingText = useI18n("loading")
    const saveText = useI18n("button.publish")

    useEffect(function () {
        void loadData(TransFiles.translations)
    }, [])

    const data = loadedData[TransFiles.translations]

    const debounced = debounce(function (obj: object) {
        try {
            localStorage.setItem("loaded-data", JSON.stringify(obj))
        } catch (e) {
            console.log(e)
        }
    }, 400)

    const onChange = useCallback(function (key: string) {
        return function (event: ChangeEvent<HTMLTextAreaElement>) {
            setLoadedData(function (prevState) {
                const newState = {
                    ...prevState,
                    [lang]: {
                        ...prevState[lang],
                        [TransFiles.translations]: {
                            ...prevState[lang][TransFiles.translations],
                            [key]: event.target.value,
                        },
                    },
                }
                debounced(newState)
                return newState
            })
        }
    }, [setLoadedData, lang])

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
