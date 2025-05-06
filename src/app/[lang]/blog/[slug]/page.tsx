import { supportedLanguages } from "@/lib/i18n"
import fs from "fs"
import path from "path"
import { Post } from "@/components/BlogPage"

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
	params: Promise<{ slug: string; }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params

	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-4xl font-bold mb-6">Заголовок: {slug}</h1>
			<p className="text-lg text-gray-600 dark:text-gray-300">
				Здесь будет содержимое поста <code>{slug}</code>.
			</p>
		</div>
	)
}
