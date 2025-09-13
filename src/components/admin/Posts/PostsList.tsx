import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { Post } from "@/components/admin/Posts/Post"
import { TransFiles } from "@/components/admin/schemas/schemas"
import { supportedLanguages } from "@/lib/i18n"

export function PostsList() {
    const { loadedData, loadData } = useAdmin(TransFiles.posts)

    useEffect(function () {

        (async function () {
            for await (const lang of supportedLanguages) {
                void loadData(lang)
            }
        })()
    }, [loadData])

    return loadedData.map(function (post, index) {
        return (
            <Post
                key={index}
                {...post}
                even={index === 0 || index % 2 === 0}
            />
        )
    })
}
