import { LangLink } from "@/components/LangLink"
import { type Post } from "@/components/BlogPage"
import { AvailableLangs } from "@/lib/i18n"
import { getFrontUrl } from "@/lib/getUrl"

type PostsProps = {
	headerText: string
	posts: Post[]
	lang: AvailableLangs
}

export function Posts({ headerText, lang, posts }: PostsProps) {
	return (
		<section className="py-24 px-6 sm:px-12 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold mb-12 text-center">
					{headerText}
				</h2>
				<div className="grid gap-8 md:grid-cols-2">
					{posts.slice(0, 2).map(function ({ slug, image, title, excerpt }, index) {
						return (
							<LangLink
								key={index}
								href={`/blog/${slug}`}
								className="block group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
							>
								<img src={getFrontUrl(image, lang)} alt="" className="w-full h-56 object-cover" />
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-2 group-hover:underline">{title}</h3>
									<p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
								</div>
							</LangLink>
						)
					})}
				</div>
			</div>
		</section>
	)
}
