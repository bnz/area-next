export const supportedLanguages = [
    "en",
    "lv",
    "ru",
]

export function generateLangStaticParams() {
    return supportedLanguages.map(function (lang) {
        return { lang }
    })
}
