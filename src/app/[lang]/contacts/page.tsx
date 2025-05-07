import { generateLangStaticParams } from "@/lib/i18n"
import { ContactsForm } from "@/components/ContactsForm"
import { readContacts, readDataJSON } from "@/lib/readDataJSON"
import { PageProps } from "@/app/page"

export const generateStaticParams = generateLangStaticParams

export default async function Page({ params }: PageProps) {
    const { lang } = await params
    const translations = await readDataJSON(lang)
    const contacts = await readContacts()

    return (
        <div className="max-w-5xl mx-auto px-3 grid grid-cols-2 max-md:grid-cols-1 gap-3 lg:gap-12">
            <h3 className="lg:col-span-2 text-center font-bold text-xl mb-3 max-md:order-1">
                {translations.keys["label.contact.form"]}
            </h3>
            <ContactsForm
                token={contacts.access_key}
                email={contacts.email}
            />
            <div className="max-md:order-2">
                <p className="mb-6">
                    {translations.keys["label.contact.dsc"]}
                </p>
            </div>
        </div>
    )
}
