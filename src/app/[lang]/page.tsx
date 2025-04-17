import { generateLangStaticParams } from "@/lib/i18n"
import { Landing } from "@/components/Landing"

export const generateStaticParams = generateLangStaticParams

export type PageParams = {
    params: Promise<{ lang: string }>
}

export default function Home() {
    return <Landing />
}
