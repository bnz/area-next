export type AvailableLangs = "en" | "lv" | "ru"

export const supportedLanguages: AvailableLangs[] = [
    "en",
    "lv",
    "ru",
]

export function generateLangStaticParams() {
    return supportedLanguages.map(function (lang) {
        return { lang }
    })
}
