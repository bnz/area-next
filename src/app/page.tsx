import { redirect } from 'next/navigation'
import { type AvailableLangs } from "@/lib/i18n"

export type PageProps = {
	params: Promise<{ lang: AvailableLangs }>
}

export default function RootPage() {
	redirect('/en')
}
