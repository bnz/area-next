const GITHUB_OWNER = "bnz"
const GITHUB_REPO = "area-next"
export const BRANCH = "main" // или "master"

export function getUrl(filePath: string, search: string = "") {
    return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/${filePath}.json${search}`
}
