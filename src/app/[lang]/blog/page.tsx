import { generateLangStaticParams } from "@/lib/i18n"
import { BlogPage } from "@/components/BlogPage"

export const generateStaticParams = generateLangStaticParams

export default async function Page() {
    return <BlogPage />
}
