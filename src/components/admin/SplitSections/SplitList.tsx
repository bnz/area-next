import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"
import { ImageSection } from "@/components/admin/ImageSection"
import { TransFiles } from "@/components/admin/schemas/schemas"
import { Button } from "@/components/admin/Button"

export function SplitList() {
    const titleText = useI18n("label.title")
    const subTitleText = useI18n("label.subTitle")
    const deleteText = useI18n("button.delete")

    const { loadedData, loadData, updateArrayData, removeFromArrayData } = useAdmin(TransFiles.splits)

    useEffect(function () {
        void loadData()
    }, [loadData])

    return loadedData.map(function ({ id, title, subTitle, image }) {
        const update = updateArrayData(id)

        return (
            <div
                key={id}
                className="grid grid-cols-[2fr_1fr] gap-3 py-3 mb-3 border-b border-gray-200 dark:border-gray-800 px-4"
            >
                <textarea
                    rows={1}
                    placeholder={titleText}
                    defaultValue={title}
                    name="title"
                    onChange={update}
                />
                <div className="row-span-3 flex flex-col items-center">
                    <ImageSection
                        id={id}
                        image={image}
                        filename={TransFiles.splits}
                    />
                </div>
                <textarea
                    rows={2}
                    placeholder={subTitleText}
                    defaultValue={subTitle}
                    name="subTitle"
                    onChange={update}
                />
                <div className="text-right">
                    <Button className="!bg-red-500"
                        disabled={loadedData.length <= 1}
                        onClick={function () {
                            removeFromArrayData(id)
                        }}>
                        {deleteText}
                    </Button>
                </div>
            </div>
        )
    })
}
