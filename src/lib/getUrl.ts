const GITHUB_OWNER = "bnz"
const GITHUB_REPO = "area-next"
// const FILE_PATH = "ru/translations" // путь до json-файла
export const BRANCH = "main" // или "master"

export function getUrl(filePath: string, search: string = "") {
    return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/${filePath}.json${search}`
}
