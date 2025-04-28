import { useI18n } from "@/components/I18nProvider"
import { useEffect, useState } from "react"
import { TransFiles, useAdmin } from "@/components/AdminProvider"

export function Features() {
    const addText = useI18n("button.add")

    const [formOpen, setFormOpen] = useState(false)
    const { loadData } = useAdmin()

    useEffect(function () {
        void loadData(TransFiles.features)
    }, [])

    return (
        <div>

            <div className="py-3 border-t border-gray-300 dark:border-gray-700">
                {formOpen ? (
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={function (event) {
                            event.preventDefault()
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            autoFocus
                        />
                        <textarea
                            rows={1}
                            placeholder="Description"
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
                    <button
                        className="button"
                        type="button"
                        onClick={function () {
                            setFormOpen(true)
                        }}
                    >
                        {addText}
                    </button>
                )}
            </div>

        </div>
    )
}
