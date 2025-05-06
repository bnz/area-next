import { LangLink } from "@/components/LangLink"

export type Post = {
	title: string
	excerpt: string
	image: string
	slug: string
	content: string
	datetime: string
}

type BlogPageProps = {
	headerText: string
	posts: Post[]
}

export function BlogPage({ headerText, posts }: BlogPageProps) {
	return (
		<div className="max-w-6xl mx-auto">
			<h1 className="text-4xl font-bold mb-12 text-center">
				{headerText}
			</h1>
			<div className="grid gap-6 md:gap-12 sm:grid-cols-2 lg:grid-cols-3 p-4">
				{posts.map(function ({slug, image, title, content, excerpt}, index) {
					return (
						<LangLink
							key={index}
							href={`/blog/${slug}`}
							className="block group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
						>
							<img src={image} alt="" className="w-full h-48 object-cover" />
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-2 group-hover:underline">{title}</h2>
								<p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
							</div>
						</LangLink>
					)
				})}
			</div>
		</div>
	)
}
