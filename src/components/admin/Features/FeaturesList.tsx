import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { useEffect } from "react"
import { Button } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function FeaturesList() {
    const titleText = useI18n("label.title")
    const descriptionText = useI18n("label.description")
    const deleteText = useI18n("button.delete")
    // const revertChangesText = useI18n("button.revertChanges")

    const {
        loadedData, updateArrayData, removeFromArrayData, loadData,
        // areEqual
    } = useAdmin(TransFiles.features)

    useEffect(function () {
        void loadData()
    }, [loadData])

    return loadedData.map(function ({ id, title, description }) {
        const update = updateArrayData(id)
        // const equal = areEqual(id)

        return (
            <div
                key={id}
                className="grid grid-cols-[1fr_100px] gap-3 py-4 px-4 rounded border-b border-gray-200 dark:border-gray-800"
            >
                <input
                    type="text"
                    defaultValue={title}
                    placeholder={titleText}
                    name="title"
                    onChange={update}
                />
                <div className="row-span-2 flex flex-col gap-2 items-center justify-center">
                    <Button className="!bg-red-500" onClick={function () {
                        removeFromArrayData(id)
                    }}>
                        {deleteText}
                    </Button>
                    {/*
					{!equal && (
						<Button className="bg-green-500" onClick={function () {

						}}>
							{revertChangesText}
						</Button>
					)}
					*/}
                </div>
                <textarea
                    rows={1}
                    placeholder={descriptionText}
                    defaultValue={description}
                    name="description"
                    onChange={update}
                />
            </div>
        )
    })
}
