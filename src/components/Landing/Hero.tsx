import { LangLink } from "@/components/LangLink"

type HeroProps = {
	headerText: string
	subHeaderText: string
	buttonText: string
}

export function Hero({ headerText, subHeaderText, buttonText }: HeroProps) {
	return (
		<section
			className="flex flex-col items-center justify-center flex-1 text-center px-6 sm:px-12 py-24 bg-transparent">
			<h1 className="text-3xl sm:text-7xl font-semibold max-w-4xl leading-tight">
				{headerText}
			</h1>
			<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mt-6">
				{subHeaderText}
			</p>
			<LangLink
				href="/contacts"
				className="mt-10 text-base px-6 py-3 bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded-full hover:opacity-90 transition"
			>
				{buttonText}
			</LangLink>
		</section>
	)
}
