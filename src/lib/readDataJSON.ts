import { type AvailableLangs } from "@/lib/i18n"
import { type Translations } from "@/components/I18nProvider"
import path from "path"
import fs from "fs"

export async function readDataJSON(lang: AvailableLangs) {
	function getPath(filename: string) {
		return path.join(process.cwd(), "data", lang, `${filename}.json`)
	}

	try {
		return {
			...(JSON.parse(fs.readFileSync(getPath("common"), "utf-8")) as Record<string, string>),
			...(JSON.parse(fs.readFileSync(getPath("translations"), "utf-8")) as Record<string, string>),
			features: JSON.parse(fs.readFileSync(getPath("features"), "utf-8")),
			posts: JSON.parse(fs.readFileSync(getPath("posts"), "utf-8")),
		} as Translations
	} catch (e) {
		console.warn(`⚠️ Не удалось прочитать файл: ${e}`)
	}
}
