"use client"

import { LangLink } from "@/components/LangLink"
import { useGetPosts } from "@/lib/useGetPosts"

export function LandingPosts() {
    const posts = useGetPosts()

    return (
        <section className="py-24 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Из блога</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {posts.map(function (post, index) {
                        return (
                            <LangLink
                                key={index}
                                href={`/blog/${post.slug}`}
                                className="block group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                            >
                                <img src={post.image} alt="" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                                </div>
                            </LangLink>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
