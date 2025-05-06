import { generateLangStaticParams } from "@/lib/i18n"
import { CTA, Features, Hero, Posts, SplitSections } from "@/components/Landing"
import { readDataJSON } from "@/lib/readDataJSON"
import { Feature } from "@/components/admin/AdminProvider"
import { PageProps } from "@/app/page"

export const generateStaticParams = generateLangStaticParams

export default async function Home({ params }: PageProps) {
	const { lang } = await params
	const translations = await readDataJSON(lang)

	return (
		<>
			<Hero
				headerText={translations["text.main.header"]}
				subHeaderText={translations["text.main.subHeader"]}
				buttonText={translations["button.contacts.header"]}
			/>
			<Features features={translations["features"] as Feature[]} />
			<Posts
				headerText={translations["blog.heading"]}
				posts={translations["posts"]}
				lang={lang}
			/>
			<SplitSections />
			<CTA
				footerText={translations["footer.text"]}
				buttonText={translations["button.register"]}
			/>
		</>
	)
}
