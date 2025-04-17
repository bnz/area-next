import { generateLangStaticParams } from "@/lib/i18n"
import { BlogPage } from "@/app/[lang]/blog/BlogPage"

export const generateStaticParams = generateLangStaticParams

export default async function Page() {
    return <BlogPage />
}
