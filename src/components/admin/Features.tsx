import { useI18n } from "@/components/I18nProvider"
import { useEffect, useState } from "react"
import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"

export function Features() {
    const addText = useI18n("button.add")

    const [formOpen, setFormOpen] = useState(false)
    const { loadData, loadedData, setLoadedData, lang, saveData, updateArrayData } = useAdmin()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })

    useEffect(function () {
        void loadData(TransFiles.features)
    }, [])

    const data = loadedData[TransFiles.features]

    return (
        <div>
            <div className="mb-5">
                {data.map(function ({ title, description }, index) {
                    return (
                        <div key={index}
                            className="grid grid-cols-[1fr_50px] gap-3 outline-1 outline-gray-300 dark:outline-gray-700 mb-5 p-2 rounded">
                            <input
                                type="text"
                                defaultValue={title}
                                placeholder="Title"
                                name="title"
                                onChange={updateArrayData(TransFiles.features, index)}
                            />
                            <div className="row-span-2">
                                <button className="button" type="button" onClick={function () {
                                    setLoadedData(function (prevState) {
                                        const newState = structuredClone(prevState)
                                        newState[lang][TransFiles.features].splice(index, 1)
                                        localStorage.setItem(LOADED_DATA, JSON.stringify(newState))
                                        return newState
                                    })
                                }}>
                                    X
                                </button>
                            </div>
                            <textarea
                                rows={1}
                                placeholder="Description"
                                defaultValue={description}
                                name="description"
                                onChange={updateArrayData(TransFiles.features, index)}
                            ></textarea>
                        </div>
                    )
                })}
            </div>
            <div className="py-3 border-t border-gray-300 dark:border-gray-700">
                {formOpen ? (
                    <form
                        className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
                        onSubmit={function (event) {
                            event.preventDefault()

                            setLoadedData(function (prevState) {
                                const newState = {
                                    ...prevState,
                                    [lang]: {
                                        ...prevState[lang],
                                        [TransFiles.features]: [
                                            ...prevState[lang][TransFiles.features],
                                            formData,
                                        ],
                                    },
                                }

                                localStorage.setItem(LOADED_DATA, JSON.stringify(newState))

                                return newState
                            })

                            setFormOpen(false)
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            autoFocus
                            defaultValue={formData.title}
                            onChange={function (event) {
                                setFormData(function (prevState) {
                                    return {
                                        ...prevState,
                                        title: event.target.value,
                                    }
                                })
                            }}
                        />
                        <textarea
                            rows={1}
                            placeholder="Description"
                            defaultValue={formData.description}
                            onChange={function (event) {
                                setFormData(function (prevState) {
                                    return {
                                        ...prevState,
                                        description: event.target.value,
                                    }
                                })
                            }}
                        ></textarea>
                        <div className="flex gap-3">
                            <button className="button" type="submit">
                                Save
                            </button>
                            <button type="button" className="cursor-pointer" onClick={function () {
                                setFormOpen(function (prevState) {
                                    return !prevState
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button className="button" type="button" onClick={function () {
                        setFormOpen(true)
                    }}>
                        {addText}
                    </button>
                )}
            </div>
            <div className="text-center">
                <button className="button" type="button" onClick={async function () {
                    await saveData(TransFiles.features)
                }}>
                    {useI18n("button.publish")}
                </button>
            </div>
        </div>
    )
}
