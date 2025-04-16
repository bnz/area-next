const GITHUB_OWNER = "bnz"
const GITHUB_REPO = "area-next"
const FILE_PATH = "data/translations.json" // путь до json-файла
export const BRANCH = "main" // или "master"

export function getUrl(search: string = "") {
    return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}${search}`
}
