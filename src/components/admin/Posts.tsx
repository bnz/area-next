import { useEffect } from "react"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"

export function Posts() {
    const { loadData, loadedData } = useAdmin()

    useEffect(function () {
        void loadData(TransFiles.posts)
    }, [])

    const data = loadedData[TransFiles.posts]

    return (
        <div>
            {data.map(function ({ slug, title, image, excerpt }, index) {
                return (
                    <div key={index} className="flex flex-col gap-3 border-b border-gray-200 py-6">
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
                        <input
                            type="text"
                            placeholder="Url"
                            defaultValue={slug}
                            name="slug"
                        />
                    </div>
                )
            })}
        </div>
    )
}
