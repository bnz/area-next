import { generateLangStaticParams } from "@/lib/i18n"
import { BlogPage } from "@/components/BlogPage"
import { readDataJSON } from "@/lib/readDataJSON"
import { PageProps } from "@/app/page"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageProps) {
	const { lang } = await params
	const translations = await readDataJSON(lang)

	return (
		<BlogPage
			headerText={translations.keys.blog}
			posts={translations.posts}
			lang={lang}
		/>
	)
}
