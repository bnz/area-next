import { type  AvailableLangs, generateLangStaticParams } from "@/lib/i18n"
import { Login } from "@/components/admin/Login"
import { type PageProps } from "@/app/page"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageProps) {
    const { lang } = await params

    return <Login lang={lang as AvailableLangs} />
}
