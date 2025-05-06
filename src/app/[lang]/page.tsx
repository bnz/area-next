import { generateLangStaticParams } from "@/lib/i18n"
import { CTA, Features, Hero, Posts, SplitSections } from "@/components/Landing"
import { readDataJSON } from "@/lib/readDataJSON"
import { PageProps } from "@/app/page"

export const generateStaticParams = generateLangStaticParams

export default async function Home({ params }: PageProps) {
	const { lang } = await params
	const translations = await readDataJSON(lang)

	return (
		<>
			<Hero
				headerText={translations.keys["text.main.header"]}
				subHeaderText={translations.keys["text.main.subHeader"]}
				buttonText={translations.keys["button.contacts.header"]}
			/>
			<Features features={translations.features} />
			<Posts
				headerText={translations.keys["blog.heading"]}
				posts={translations.posts}
			/>
			<SplitSections />
			<CTA
				footerText={translations.keys["footer.text"]}
				buttonText={translations.keys["button.register"]}
			/>
		</>
	)
}
