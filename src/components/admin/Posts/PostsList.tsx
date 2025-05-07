import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { ImageSection } from "@/components/admin/ImageSection"
import { DeletePostButton } from "@/components/admin/Posts/DeletePostButton"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { useI18n } from "@/components/I18nProvider"
import { useEffect } from "react"

export function PostsList() {
    const urlText = useI18n("label.url")
    const titleText = useI18n("label.title")
    const excerptText = useI18n("label.excerpt")
    const contentText = useI18n("label.content")

    const { loadedData, updateArrayData, loadData } = useAdmin()

    useEffect(function () {
        void loadData(TransFiles.posts)
    }, [])

    const data = loadedData[TransFiles.posts]

    return data.map(function ({ slug, title, image, excerpt, content, datetime }, index) {
        const update = updateArrayData(TransFiles.posts, index)

        return (
            <div
                key={index}
                className="grid grid-cols-[2fr_1fr] gap-3 border-b border-gray-200 dark:border-gray-800 py-6 mb-3"
            >
                <input type="text" placeholder={urlText} defaultValue={slug} name="slug" onChange={update} />
                <div className="rounded row-span-4 flex">
                    <div className="flex-1 pr-5">
                        <ImageSection
                            image={image}
                            index={index}
                            filename={TransFiles.posts}
                        />
                    </div>
                    <div>
                        <DeletePostButton index={index} />
                    </div>
                </div>
                <input type="text" placeholder={titleText} defaultValue={title} name="title" onChange={update} />
                <DateTimeInput name="datetime" onChange={update} defaultValue={datetime} />
                <input type="text" placeholder={excerptText} defaultValue={excerpt} name="excerpt" onChange={update} />
                <textarea placeholder={contentText} defaultValue={content} name="content" onChange={update}></textarea>
            </div>
        )
    })
}
