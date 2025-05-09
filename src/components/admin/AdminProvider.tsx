"use client"

import {
	ChangeEvent,
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"
import { BRANCH, getImagesUrl, getImageUrl, getUrl } from "@/lib/getUrl"
import { Buffer } from "buffer"
import { LoginForm } from "@/components/admin/LoginForm"
import { useI18n } from "@/components/I18nProvider"
import { type AvailableLangs, supportedLanguages } from "@/lib/i18n"
import debounce from "lodash.debounce"
import { sleep } from "@/helpers/sleep"

export enum TransFiles {
	common = "common",
	translations = "translations",
	features = "features",
	posts = "posts",
	splits = "splits",
}

type ShaItem = {
	[trans in TransFiles]: string
}

type ShaData = {
	[lang in AvailableLangs]: ShaItem
}

const defaultShaItem = {
	[TransFiles.common]: "",
	[TransFiles.translations]: "",
	[TransFiles.features]: "",
	[TransFiles.posts]: "",
	[TransFiles.splits]: "",
}

const defaultShaData: ShaData = {
	en: defaultShaItem,
	lv: defaultShaItem,
	ru: defaultShaItem,
}

export type Feature = {
	title: string
	description: string
}

export type Post = {
	title: string
	excerpt: string
	image: string
	slug: string
	content: string
	datetime: string
}

export type Split = {
	title: string
	subTitle: string
	image: string
}

type LoadedDataItem = {
	[TransFiles.common]: Record<string, string>
	[TransFiles.translations]: Record<string, string>
	[TransFiles.features]: Feature[]
	[TransFiles.posts]: Post[]
	[TransFiles.splits]: Split[]
}

type LoadedData = {
	[lang in AvailableLangs]: LoadedDataItem
}

const defaultLoadedDataItem: LoadedDataItem = {
	[TransFiles.common]: {},
	[TransFiles.translations]: {},
	[TransFiles.features]: [],
	[TransFiles.posts]: [],
	[TransFiles.splits]: [],
}

const defaultLoadedData: LoadedData = {
	en: defaultLoadedDataItem,
	lv: defaultLoadedDataItem,
	ru: defaultLoadedDataItem,
}

const AdminContext = createContext<{
	loadFile(filename: TransFiles, newToken?: string): Promise<{
		content: string
		sha: string
	} | undefined>
	publishData(filename: TransFiles, stringToSave: string, sha: string, lang: AvailableLangs): Promise<{
		sha: string
	} | undefined>
	logOut: VoidFunction
	loadedData: LoadedDataItem
	setLoadedData: Dispatch<SetStateAction<LoadedData>>
	loadData(filename: TransFiles): Promise<void>
	saveData(filename: TransFiles, allLangs?: boolean): Promise<void>
	updateRecordData(key: string): (event: ChangeEvent<HTMLTextAreaElement>) => void
	updateArrayData(filename: TransFiles, index: number): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	lang: AvailableLangs
	publishLoading: boolean
	setPublishLoading: Dispatch<SetStateAction<boolean>>
	uploadImage(file: File): Promise<any>
	getImagesList(): Promise<any>
	removeFromArrayData(filename: TransFiles.posts | TransFiles.features, index: number): void
	saveToLocalStorage(obj: LoadedData): void
}>({
	async loadFile() {
		return undefined
	},
	async publishData() {
		return undefined
	},
	logOut() {
	},
	loadedData: defaultLoadedDataItem,
	setLoadedData() {
	},
	async loadData() {
	},
	async saveData() {
	},
	updateRecordData() {
		return function () {
		}
	},
	updateArrayData() {
		return function () {
		}
	},
	lang: "en",
	publishLoading: false,
	setPublishLoading() {
	},
	async uploadImage() {
	},
	async getImagesList() {
	},
	removeFromArrayData() {
	},
	saveToLocalStorage() {
	},
})

export function useAdmin() {
	return useContext(AdminContext)
}

export const LOADED_DATA = "loaded-data"
const SHA_DATA = "sha-data"
const TOKEN = "token"

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: AvailableLangs }>) {
	const loadingText = useI18n("loading")

	const [token, setToken] = useState("")
	const [loading, setLoading] = useState<boolean>(false)
	const [sha, setSha] = useState<ShaData>(defaultShaData)
	const [loadedData, setLoadedData] = useState<LoadedData>(defaultLoadedData)
	const [publishLoading, setPublishLoading] = useState(false)

	useEffect(function () {
		try {
			const dataStorage = localStorage.getItem(LOADED_DATA)
			if (dataStorage) {
				setLoadedData(JSON.parse(dataStorage || "{}"))
			}
			const shaStorage = localStorage.getItem(SHA_DATA)
			if (shaStorage) {
				setSha(JSON.parse(shaStorage || "{}"))
			}
		} catch (e) {
			console.log(e)
		}
	}, [setLoadedData, setSha])

	useEffect(function () {
		try {
			const data = localStorage.getItem(TOKEN)
			if (data !== null) {
				setToken(JSON.parse(data))
			}
		} catch (e) {
			console.log(e)
		}
	}, [setToken])

	const changeSha = useCallback(function (filename: TransFiles, sha: string) {
		setSha(function (prevState) {
			const newState = {
				...prevState,
				[lang]: {
					...prevState[lang],
					[filename]: sha,
				},
			}
			localStorage.setItem(SHA_DATA, JSON.stringify(newState))
			return newState
		})
	}, [lang])

	const loadFile = useCallback(async function (filename: TransFiles, newToken?: string) {
		try {
			const res = await fetch(getUrl(`${lang}/${filename}`, `?ref=${BRANCH}`), {
				headers: {
					Authorization: `token ${newToken || token}`,
				},
			})
			const data = await res.json()

			if (data.status) {
				return undefined
			}

			if (newToken) {
				localStorage.setItem(TOKEN, JSON.stringify(newToken))
				setToken(newToken)
			}

			return {
				content: Buffer.from(data.content, "base64").toString("utf8"),
				sha: data.sha as string,
			}
		} catch (err) {
			console.error(err)
		}
	}, [lang, setLoading, token])

	const publishData = useCallback(async function (filename: TransFiles, stringToSave: string, sha: string, lang: AvailableLangs) {
		try {
			const base64Content = Buffer.from(stringToSave).toString("base64")

			const res = await fetch(getUrl(`${lang}/${filename}`), {
				method: "PUT",
				headers: {
					Authorization: `token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: `i18n update from admin (/${lang}/${filename}.json)`,
					content: base64Content,
					sha,
					branch: BRANCH,
				}),
			})

			const result = await res.json()
			if (res.ok) {
				return {
					sha: result.content.sha as string,
				}
			} else {
				console.error(result)
			}
		} catch (err) {
			console.error(err)
		}
	}, [token, lang])

	const loadData = useCallback(async function (filename: TransFiles) {
		if (Object.keys(loadedData[lang][filename]).length > 0) {
			return
		}

		const data = await loadFile(filename)

		if (data) {
			try {
				setLoadedData(function (prevState) {
					const newState = {
						...prevState,
						[lang]: {
							...prevState[lang],
							[filename]: JSON.parse(data.content),
						},
					}

					localStorage.setItem(LOADED_DATA, JSON.stringify(newState))

					return newState
				})
				changeSha(filename, data.sha)
			} catch (e) {
				console.log(e)
			}
		}
	}, [loadFile, loadedData, setLoadedData, lang])

	const saveData = useCallback(async function (filename: TransFiles, allLangs?: boolean) {
		try {
			setPublishLoading(true)

			const langsToGo = allLangs ? supportedLanguages : [lang]

			for (const lang of langsToGo) {
				const income = await publishData(
					filename,
					JSON.stringify(loadedData[lang][filename], null, 2),
					sha[lang][filename],
					lang,
				)
				if (income) {
					changeSha(filename, income.sha)
				}
			}
			setPublishLoading(false)
		} catch (e) {
			console.log(e)
		}
	}, [publishData, sha, loadedData, lang, setPublishLoading])

	const logOut = useCallback(function () {
		localStorage.removeItem(TOKEN)
		localStorage.removeItem(LOADED_DATA)
		localStorage.removeItem(SHA_DATA)
		window.location.reload()
	}, [])

	const saveToLocalStorage = debounce(function (obj: LoadedData) {
		try {
			localStorage.setItem(LOADED_DATA, JSON.stringify(obj))
		} catch (e) {
			console.log(e)
		}
	}, 400)

	const updateRecordData = useCallback(function (key: string) {
		return function (event: ChangeEvent<HTMLTextAreaElement>) {
			setLoadedData(function (prevState) {
				const newState = {
					...prevState,
					[lang]: {
						...prevState[lang],
						[TransFiles.translations]: {
							...prevState[lang][TransFiles.translations],
							[key]: event.target.value,
						},
					},
				}
				saveToLocalStorage(newState)
				return newState
			})
		}
	}, [lang, saveToLocalStorage, setLoadedData])

	const updateArrayData = useCallback(function (filename: TransFiles, index: number) {
		return function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
			setLoadedData(function (prevState) {
				const arrayClone = structuredClone(prevState[lang][filename])
				// @ts-ignore
				arrayClone[index][event.target.name] = event.target.value
				const newState = {
					...prevState,
					[lang]: {
						...prevState[lang],
						[filename]: arrayClone,
					},
				}
				saveToLocalStorage(newState)
				return newState
			})
		}
	}, [lang, saveToLocalStorage, setLoadedData])

	const uploadImage = useCallback(async function (file: File) {
		const reader = new FileReader()

		const base64Content: string = await new Promise((resolve, reject) => {
			reader.onloadend = () => {
				const result = reader.result as string
				resolve(result.split(',')[1])
			}
			reader.onerror = reject
			reader.readAsDataURL(file)
		})

		const url = getImageUrl(file.name)

		const res = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `token ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: `upload image ${url.split("contents")[1]}`,
				content: base64Content,
				branch: BRANCH,
			}),
		})

		if (!res.ok) {
			throw new Error('Failed to upload image')
		}
		const data = await res.json()
		return data.content.path.replace("public/", "/")
	}, [token])

	const getImagesList = useCallback(async function () {
		return await (await fetch(getImagesUrl(), {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/vnd.github.v3+json',
			},
		})).json()
	}, [token])

	const removeFromArrayData = useCallback(function (filename: TransFiles.posts | TransFiles.features, index: number) {
		setLoadedData(function (prevState) {
			const newState = structuredClone(prevState)
			supportedLanguages.forEach(function (lang) {
				newState[lang][filename].splice(index, 1)
			})
			saveToLocalStorage(newState)
			return newState
		})
	}, [setLoadedData])

	return (
		<AdminContext.Provider value={{
			loadFile,
			publishData,
			logOut,
			loadedData: loadedData[lang],
			setLoadedData,
			loadData,
			saveData,
			updateRecordData,
			updateArrayData,
			lang,
			publishLoading,
			setPublishLoading,
			uploadImage,
			getImagesList,
			removeFromArrayData,
			saveToLocalStorage,
		}}>
			{loading
				? (
					<div className="max-w-lg mx-auto flex items-center justify-center min-h-48">
						{loadingText}
					</div>
				)
				: token
					? children
					: <LoginForm />
			}
		</AdminContext.Provider>
	)
}
