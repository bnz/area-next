import { AvailableLangs, supportedLanguages } from "@/lib/i18n"
import fs from "fs"
import path from "path"
import { Post } from "@/components/BlogPage"
import { readDataJSON } from "@/lib/readDataJSON"
import { formatDate } from "@/lib/formatDate"

export function generateStaticParams() {
	const allParams: { lang: string, slug: string }[] = []

	supportedLanguages.forEach(function (lang) {
		const filePath = path.join(process.cwd(), "data", lang, "posts.json")

		try {
			const file = fs.readFileSync(filePath, "utf-8")
			const posts = JSON.parse(file) as Post[]

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
	const post = translations.posts.find(function ({ slug: _slug }) {
		return slug === _slug
	})!

	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-4xl font-bold mb-6">
				{post.title}
			</h1>
			<div className="italic text-sm mb-3 text-right">{formatDate(post.datetime)}</div>
			<img src={post.image} alt="" className="mb-6 mx-auto" />
			<h4 className="mb-6 font-bold">
				{post.excerpt}
			</h4>
			<p className="text-lg text-gray-600 dark:text-gray-300">
				{post.content}
			</p>
		</div>
	)
}
