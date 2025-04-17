import { useEffect, useState } from "react"
import { Post } from "@/app/[lang]/blog/BlogPage"
import { useParams } from "next/navigation"

export function useGetPosts() {
    const { lang } = useParams()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(function () {
        (async function () {
            try {
                const a = await (await fetch(`/data/${lang}/posts.json`)).json()
                setPosts(a)
            } catch (e) {
                console.log(e)
                setPosts([])
            }
        })()
    }, [lang, setPosts])

    return posts
}
