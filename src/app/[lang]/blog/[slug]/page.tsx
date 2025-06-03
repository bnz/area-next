import { AvailableLangs, supportedLanguages } from "@/lib/i18n"
import fs from "fs"
import path from "path"
import { readDataJSON } from "@/lib/readDataJSON"
import { formatDate } from "@/lib/formatDate"
import { LangLink } from "@/components/LangLink"
import { PostItem } from "@/components/admin/schemas/schemas"

export function generateStaticParams() {
	const allParams: { lang: string, slug: string }[] = []

	supportedLanguages.forEach(function (lang) {
		const filePath = path.join(process.cwd(), "data", lang, "posts.json")

		try {
			const file = fs.readFileSync(filePath, "utf-8")
			const posts = JSON.parse(file) as PostItem[]

			posts.forEach(function ({ slug }) {
				if (!allParams.find(function ({ slug: _slug, lang: _lang }) {
					return slug === _slug && lang === _lang
				})) {
					allParams.push({ lang, slug })
				}
			})

		} catch (e) {
			console.warn(`⚠️ Не удалось прочитать файл: ${filePath}`)
		}
	})

	return allParams
}

type BlogPostPageProps = {
	params: Promise<{ slug: string, lang: AvailableLangs }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug, lang } = await params
	const translations = await readDataJSON(lang)
	const postIndex = translations.posts.findIndex(function ({ slug: _slug }) {
		return slug === _slug
	})
	const post = translations.posts[postIndex]
	const prev = translations.posts[postIndex - 1]
	const next = translations.posts[postIndex + 1]

	return (
		<>
			<div className="max-w-3xl mx-auto mb-24 px-4">
				<h1 className="text-4xl font-bold mb-6 max-md:text-center">
					{post.title}
				</h1>
				<div className="italic text-sm mb-3 text-right">{formatDate(post.datetime)}</div>
				{post.image && (
					<img src={post.image} alt="" className="mb-6 mx-auto rounded-xl" />
				)}
				<h4 className="mb-6 font-bold">
					{post.excerpt}
				</h4>
				{post.content.split("\n\n").map(function (item, index) {
					return (
						<p key={index} className="text-lg text-gray-600 dark:text-gray-300 mb-6">
							{item}
						</p>
					)
				})}
			</div>
			<div className="max-w-3xl mx-auto flex justify-between mb-6 px-4">
				{prev ? (
					<LangLink href={`/blog/${prev.slug}`}>
						{translations.keys["button.post.prev"]}
					</LangLink>
				) : <div />}
				{next && (
					<LangLink href={`/blog/${next.slug}`}>
						{translations.keys["button.post.next"]}
					</LangLink>
				)}
			</div>
		</>
	)
}
