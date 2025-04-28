import { type  AvailableLangs, generateLangStaticParams } from "@/lib/i18n"
import { type  PageParams } from "@/app/[lang]/page"
import { Login } from "@/components/Login"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageParams) {
    const { lang } = await params

    return <Login lang={lang as AvailableLangs} />
}
