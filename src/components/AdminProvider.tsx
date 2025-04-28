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

export enum TransFiles {
    common = "common",
    translations = "translations",
}

type LoadedData = {
    [TransFiles.common]: Record<string, string>
    [TransFiles.translations]: Record<string, string>
}

const AdminContext = createContext<{
    loadFile: any
    logOut: VoidFunction
    loadedData: LoadedData
    setLoadedData: Dispatch<SetStateAction<LoadedData>>
    loadData(filename: TransFiles): Promise<void>
}>({
    loadFile() {
    },
    logOut() {
    },
    loadedData: {
        [TransFiles.common]: {},
        [TransFiles.translations]: {},
    },
    setLoadedData() {
    },
    async loadData(filename) {
    },
})

export function useAdmin() {
    return useContext(AdminContext)
}

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: string }>) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const loadingText = useI18n("loading")

    const [loadedData, setLoadedData] = useState<LoadedData>({
        common: {},
        translations: {},
    })

    useEffect(function () {
        try {
            const data = localStorage.getItem("token")
            if (data !== null) {
                setToken(JSON.parse(data))
            }
        } catch (e) {
            console.log(e)
        }
    }, [setToken])

    const loadFile = useCallback(async (filename: TransFiles, newToken?: string) => {
        try {
            const res = await fetchStub(getUrl(`${lang}/${filename}`, `?ref=${BRANCH}`), {
                headers: {
                    Authorization: `token ${newToken || token}`,
                },
            })
            const data = await res.json()

            if (data.status) {
                return undefined
            }

            if (newToken) {
                localStorage.setItem("token", JSON.stringify(newToken))
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

    async function saveFile(filename: TransFiles, stringToSave: string, sha: string) {
        try {
            const base64Content = Buffer.from(stringToSave).toString("base64")

            const res = await fetch(getUrl(filename), {
                method: "PUT",
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "i18n update from admin",
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
    }

    const loadData = useCallback(async function (filename: TransFiles) {
        if (Object.keys(loadedData[filename]).length > 0) {
            return
        }

        const data = await loadFile(filename)
        if (data) {
            try {
                setLoadedData(function (prevState) {
                    return {
                        ...prevState,
                        [filename]: JSON.parse(data.content),
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }

    }, [loadFile, loadedData, setLoadedData])

    const logOut = useCallback(function () {
        localStorage.removeItem("token")
        window.location.reload()
    }, [])

    return (
        <AdminContext.Provider value={{
            loadFile,
            logOut,
            loadedData,
            setLoadedData,
            loadData,
        }}>
            {loading
                ? (
                    <div className="max-w-lg mx-auto">
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
