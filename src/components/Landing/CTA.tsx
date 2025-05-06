import { LangLink } from "@/components/LangLink"

type CTAProps = {
	footerText: string
	buttonText: string
}

export function CTA({ footerText, buttonText }: CTAProps) {
	return (
		<section className="py-20 px-6 sm:px-12 bg-black dark:bg-gray-200 text-gray-100 dark:text-gray-900 text-center">
			<h2 className="text-3xl font-semibold max-w-xl mx-auto">
				{footerText}
			</h2>
			<LangLink
				href="/contacts"
				className="mt-8 inline-block px-6 py-3 bg-white text-black dark:bg-gray-950 dark:text-white border border-current rounded-full hover:opacity-90 transition"
			>
				{buttonText}
			</LangLink>
		</section>
	)
}
