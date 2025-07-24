import { AvailableLangs } from "@/lib/i18n"

const GITHUB_OWNER = "bnz"
const GITHUB_REPO = "area-next"
export const BRANCH = "main"

export function getUrl(filePath: string, search: string = "") {
	return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/${filePath}.json${search}`
}

export function getImagesUrl() {
	return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/images`
}

export function getImageUrl(filename: string) {
	return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/images/${filename}`
}

export function getFrontUrl(src: string, lang: AvailableLangs) {
	return `/data/${lang}/images/${src}`
}

export function getActionRuns() {
	return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs?per_page=1`
// 	actions/workflows/deploy.yml/runs?per_page=1
}
