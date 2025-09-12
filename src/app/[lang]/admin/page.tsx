import { type  AvailableLangs, generateLangStaticParams } from "@/lib/i18n"
import { type PageProps } from "@/app/page"
import { SetAdminActive } from "@/components/admin/SetAdminActive"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageProps) {
    const { lang } = await params

    return <SetAdminActive lang={lang as AvailableLangs} />
}
