import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { BRANCH, getUrl } from "@/lib/getUrl"
import { Buffer } from "buffer"
import { LoginForm } from "@/components/LoginForm"
import { fetchStub } from "@/lib/fetchStub"
import { useI18n } from "@/components/I18nProvider"
import { type AvailableLangs } from "@/lib/i18n"

export enum TransFiles {
    common = "common",
    translations = "translations",
}

type ShaData = {
    [lang in AvailableLangs]: {
        [trans in TransFiles]: string
    }
}

const defaultShaData: ShaData = {
    en: {
        [TransFiles.common]: "",
        [TransFiles.translations]: "",
    },
    lv: {
        [TransFiles.common]: "",
        [TransFiles.translations]: "",
    },
    ru: {
        [TransFiles.common]: "",
        [TransFiles.translations]: "",
    },
}

type LoadedDataItem = {
    [trans in TransFiles]: Record<string, string>
}

type LoadedData = {
    [lang in AvailableLangs]: LoadedDataItem
}

const defaultLoadedDataItem: LoadedDataItem = {
    [TransFiles.common]: {},
    [TransFiles.translations]: {},
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
    publishData(filename: TransFiles, stringToSave: string, sha: string): Promise<{
        sha: string
    } | undefined>
    logOut: VoidFunction
    loadedData: LoadedDataItem
    setLoadedData: Dispatch<SetStateAction<LoadedData>>
    loadData(filename: TransFiles): Promise<void>
    saveData(filename: TransFiles): Promise<void>
    lang: AvailableLangs
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
    lang: "en",
})

export function useAdmin() {
    return useContext(AdminContext)
}

const LOADED_DATA = "loaded-data"
const SHA_DATA = "sha-data"
const TOKEN = "token"

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: AvailableLangs }>) {
    const loadingText = useI18n("loading")

    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [sha, setSha] = useState<ShaData>(defaultShaData)
    const [loadedData, setLoadedData] = useState<LoadedData>(defaultLoadedData)

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

    const publishData = useCallback(async function (filename: TransFiles, stringToSave: string, sha: string) {
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
                setSha(function (prevState) {
                    const newState = {
                        ...prevState,
                        [lang]: {
                            ...prevState[lang],
                            [filename]: data.sha,
                        },
                    }

                    localStorage.setItem(SHA_DATA, JSON.stringify(newState))

                    return newState
                })
            } catch (e) {
                console.log(e)
            }
        }
    }, [loadFile, loadedData, setLoadedData, setSha, lang])

    const saveData = useCallback(async function (filename: TransFiles) {
        try {
            await publishData(
                filename,
                JSON.stringify(loadedData[lang][filename], null, 2),
                sha[lang][filename],
            )
        } catch (e) {
            console.log(e)
        }
    }, [publishData, sha, loadedData, lang])

    const logOut = useCallback(function () {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(LOADED_DATA)
        localStorage.removeItem(SHA_DATA)
        window.location.reload()
    }, [])

    return (
        <AdminContext.Provider value={{
            loadFile,
            publishData,
            logOut,
            loadedData: loadedData[lang],
            setLoadedData,
            loadData,
            saveData,
            lang,
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
