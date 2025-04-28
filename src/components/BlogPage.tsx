"use client"

import { LangLink } from "@/components/LangLink"
import { useI18n } from "@/components/I18nProvider"

export type Post = {
    title: string;
    excerpt: string;
    image: string;
    slug: string;
}

export function BlogPage() {
    const posts = useI18n("posts") as never as Post[]

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center">Блог Arija</h1>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map(function (post, index) {
                    return (
                        <LangLink
                            key={index}
                            href={`/blog/${post.slug}`}
                            className="block group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                        >
                            <img src={post.image} alt="" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                            </div>
                        </LangLink>
                    )
                })}
            </div>
        </div>
    )
}
