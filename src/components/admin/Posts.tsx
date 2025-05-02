import { useEffect } from "react"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { PublishButton } from "@/components/admin/PublishButton"

export function Posts() {
    const { loadData, loadedData } = useAdmin()

    useEffect(function () {
        void loadData(TransFiles.posts)
    }, [])

    const data = loadedData[TransFiles.posts]

    return (
        <div className="relative">
            {data.map(function ({ slug, title, image, excerpt, content }, index) {
                return (
                    <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr] gap-3 border-b border-gray-200 dark:border-gray-800 py-6"
                    >
                        <input
                            type="text"
                            placeholder="Url"
                            defaultValue={slug}
                            name="slug"
                        />
                        <div className="outline-1 rounded row-span-4">
                            img
                        </div>
                        <input
                            type="text"
                            placeholder="Title"
                            defaultValue={title}
                            name="title"
                        />
                        <input
                            type="text"
                            placeholder="Excerpt"
                            defaultValue={excerpt}
                            name="excerpt"
                        />
                        <textarea
                            placeholder="Content"
                            defaultValue={content}
                            name="content"
                        ></textarea>
                    </div>
                )
            })}
            <PublishButton filename={TransFiles.posts} />
        </div>
    )
}
