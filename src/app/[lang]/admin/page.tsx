import { generateLangStaticParams } from "@/lib/i18n"
import { AdminClient } from "./AdminClient"
import { PageParams } from "@/app/[lang]/page"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageParams) {
    const { lang } = await params

    return <AdminClient lang={lang} />
}
