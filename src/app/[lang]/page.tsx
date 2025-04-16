import { generateLangStaticParams } from "@/lib/i18n"
import { LangLink } from "@/components/LangLink"

export const generateStaticParams = generateLangStaticParams

export type PageParams = {
    params: Promise<{ lang: string }>
}

export default async function Home({ params }: PageParams) {

    const { lang } = await params

    return (
        <>
            <div className="p-3">lang: {lang}</div>
            <div className="">
                aria | <LangLink href="/admin">admin</LangLink>

                <br />
                <br />

                <div className="p-3">
                    <input type="text" className="" />
                </div>
            </div>
        </>
    )
}
