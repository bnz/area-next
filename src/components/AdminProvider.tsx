import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react"
import { BRANCH, getUrl } from "@/lib/getUrl"
import { Buffer } from "buffer"
import { LoginForm } from "@/components/LoginForm"

const AdminContext = createContext<{
    loadFile: any
}>({
    loadFile() {
    },
})

export function useAdmin() {
    return useContext(AdminContext)
}

export enum TransFiles {
    welcome = "welcome"
}

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: string }>) {
    const [token, setToken] = useState("")
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const loadFile = useCallback(async (filename: TransFiles, newToken: string) => {
        try {
            setLoading(true)

            const res = await fetch(getUrl(`${lang}/${filename}`, `?ref=${BRANCH}`), {
                headers: {
                    Authorization: `token ${newToken}`,
                },
            })
            const data = await res.json()

            if (data.status) {
                setLoading(false)
                return undefined
            }

            localStorage.setItem("token", JSON.stringify(newToken))

            const content = Buffer.from(data.content, "base64").toString("utf8")

            setLoading(false)
            setIsLogged(true)

            return {
                content,
                sha: data.sha as string,
            }
        } catch (err) {
            console.error(err)
        }
    }, [lang, setLoading, setIsLogged, token])

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

    useEffect(function () {
        if (token) {
            (async function () {
                const file = await loadFile(TransFiles.welcome, token)
                setIsLogged(file !== undefined)
            })()
        }
    }, [token, loadFile])

    return (
        <AdminContext.Provider value={{ loadFile }}>
            {loading ? <div className="max-w-lg mx-auto">Loading...</div> : (
                <>
                    {!isLogged && !token && (
                        <LoginForm
                            // message="Wrong password"
                        />
                    )}
                    {isLogged && token && children}
                </>
            )}
        </AdminContext.Provider>
    )
}
