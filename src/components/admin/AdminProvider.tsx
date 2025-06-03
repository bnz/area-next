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
import { type AvailableLangs, supportedLanguages } from "@/lib/i18n"
import debounce from "lodash.debounce"
import isEqual from "lodash.isequal"
import { Loading } from "@/components/admin/Loading"
import {
    defaultShaItemSchema,
    FeatureItem,
    loadedDataSchema,
    PostItem,
    ShaData,
    SplitItem,
    TransFiles,
} from "@/components/admin/schemas/schemas"

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

export type LoadedDataItem = {
    [TransFiles.common]: Record<string, string>
    [TransFiles.translations]: Record<string, string>
    [TransFiles.features]: FeatureItem[]
    [TransFiles.posts]: PostItem[]
    [TransFiles.splits]: SplitItem[]
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

type AdminContextProps = {
    loadFile(filename: TransFiles, newToken?: string): Promise<{
        content: string
        sha: string
    } | undefined>
    logOut: VoidFunction
    loadedData: LoadedDataItem
    setLoadedData: Dispatch<SetStateAction<LoadedData>>
    loadData(filename: TransFiles): Promise<void>
    saveData(filename: TransFiles, allLangs?: boolean): Promise<void>
    updateRecordData(key: string): (event: ChangeEvent<HTMLTextAreaElement>) => void
    updateArrayData(filename: TransFiles, id: string): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    lang: AvailableLangs
    publishLoading: boolean
    setPublishLoading: Dispatch<SetStateAction<boolean>>
    uploadImage(file: File): Promise<any>
    getImagesList(): Promise<any>
    removeFromArrayData(filename: TransFiles.posts | TransFiles.features, index: number): void
    saveToLocalStorage(obj: LoadedData): void
    areEqual(filename: TransFiles, index?: number): boolean
}

const AdminContext = createContext<AdminContextProps>({
    async loadFile() {
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
    areEqual() {
        return false
    },
})

// type ArgsWithoutFirst<T> = Parameters<T> extends [infer First, ...infer Rest] ? Rest : never
// type Return<T extends keyof AdminContextProps> = ReturnType<AdminContextProps[T]>
// type Args<T extends keyof AdminContextProps> = ArgsWithoutFirst<AdminContextProps[T]>

type GetDataType<T extends TransFiles> = T extends keyof LoadedDataItem ? LoadedDataItem[T] : never

type AdminContextWithFilenameProps<T extends TransFiles> =
    Omit<AdminContextProps, "loadFile" | "loadData" | "loadedData" | "saveData" | "updateArrayData" | "areEqual"> & {

    // loadFile(...args: Args<"loadFile">): Return<"loadFile">
    loadFile(newToken?: string): Promise<{ content: string, sha: string } | undefined>

    // loadData(): Return<"loadData">
    loadData(): Promise<void>

    // saveData(...args: Args<"saveData">): Return<"saveData">
    saveData(allLangs?: boolean): Promise<void>

    loadedData: GetDataType<T>

    // updateArrayData(...args: Args<"updateArrayData">): Return<"updateArrayData">
    updateArrayData(id: string): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

    // removeFromArrayData(...args: Args<"removeFromArrayData">): Return<"removeFromArrayData">
    removeFromArrayData(index: number): void

    // areEqual(...args: Args<"areEqual">): Return<"areEqual">
    areEqual(index?: number): boolean
}

export function useAdmin(): AdminContextProps
export function useAdmin<T extends TransFiles>(filename: T): AdminContextWithFilenameProps<T>
export function useAdmin<T extends TransFiles>(filename?: T): AdminContextProps | AdminContextWithFilenameProps<T> {
    const context = useContext(AdminContext)

    return {
        ...context,
        ...(filename ? {
            loadFile(newToken?: string) {
                return context.loadFile(filename!, newToken)
            },
            loadData() {
                return context.loadData(filename!)
            },
            saveData(allLangs?: boolean) {
                return context.saveData(filename!, allLangs)
            },
            loadedData: context.loadedData[filename!],
            updateArrayData(id: string) {
                return context.updateArrayData(filename!, id)
            },
            areEqual(index?: number) {
                return context.areEqual(filename!, index)
            },
            ...(filename === TransFiles.posts || filename === TransFiles.features ? {
                removeFromArrayData(index: number) {
                    return context.removeFromArrayData(filename!, index)
                },
            } : {}),
        } : {}),
    }
}

export const LOADED_DATA = "loaded-data"
const SHA_DATA = "sha-data"
const TOKEN = "token"

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: AvailableLangs }>) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [sha, setSha] = useState<ShaData>(defaultShaData)
    const [loadedData, setLoadedData] = useState<LoadedData>(defaultLoadedData)
    const [initialLoadedData, setInitialLoadedData] = useState<LoadedData>(defaultLoadedData)
    const [publishLoading, setPublishLoading] = useState(false)

    useEffect(function () {
        try {
            const dataStorage = localStorage.getItem(LOADED_DATA)

            if (dataStorage) {
                const parsed = JSON.parse(dataStorage || "{}")
                setLoadedData(loadedDataSchema.parse(parsed))
            }
            const shaStorage = localStorage.getItem(SHA_DATA)
            if (shaStorage) {
                setSha(defaultShaItemSchema.parse(JSON.parse(shaStorage || "{}")))
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
            const newState = defaultShaItemSchema.parse({
                ...prevState,
                [lang]: {
                    ...prevState[lang],
                    [filename]: sha,
                },
            })
            localStorage.setItem(SHA_DATA, JSON.stringify(newState))
            return newState
        })
    }, [lang, setSha])

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
    }, [lang, token])

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
        const dataExists = Object.keys(loadedData[lang][filename]).length > 0
        const initialDataExists = Object.keys(initialLoadedData[lang][filename]).length > 0

        if (!dataExists || !initialDataExists) {
            setLoading(true)
            const data = await loadFile(filename)

            try {
                setLoading(false)
                if (!data) {
                    return
                }

                if (!dataExists) {
                    setLoadedData(function (prevState) {
                        const newState = loadedDataSchema.parse({
                            ...prevState,
                            [lang]: {
                                ...prevState[lang],
                                [filename]: JSON.parse(data.content),
                            },
                        })
                        saveToLocalStorage(newState)
                        return newState
                    })
                    changeSha(filename, data.sha)
                }

                if (!initialDataExists) {
                    setInitialLoadedData(function (prevState) {
                        return loadedDataSchema.parse({
                            ...prevState,
                            [lang]: {
                                ...prevState[lang],
                                [filename]: JSON.parse(data.content),
                            },
                        })
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    }, [loadFile, loadedData, initialLoadedData, setLoadedData, lang, setInitialLoadedData, setLoading])

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
                const newState = loadedDataSchema.parse({
                    ...prevState,
                    [lang]: {
                        ...prevState[lang],
                        [TransFiles.translations]: {
                            ...prevState[lang][TransFiles.translations],
                            [key]: event.target.value,
                        },
                    },
                })
                saveToLocalStorage(newState)
                return newState
            })
        }
    }, [lang, saveToLocalStorage, setLoadedData])

    const updateArrayData = useCallback(function (filename: TransFiles.features | TransFiles.posts | TransFiles.splits, id: string) {
        return function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
            setLoadedData(function (prevState) {
                const arrayClone = structuredClone(prevState[lang][filename])

                // @ts-ignore
                arrayClone[index][event.target.name] = event.target.value
                const newState = loadedDataSchema.parse({
                    ...prevState,
                    [lang]: {
                        ...prevState[lang],
                        [filename]: arrayClone,
                    },
                })
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
            const validated = loadedDataSchema.parse(newState)
            saveToLocalStorage(validated)
            return validated
        })
    }, [setLoadedData])

    const areEqual = useCallback(function (filename: TransFiles, index?: number): boolean {

        if (index !== undefined && (filename === TransFiles.features || filename === TransFiles.posts || filename === TransFiles.splits)) {
            return isEqual(
                initialLoadedData[lang][filename][index],
                loadedData[lang][filename][index],
            )
        }

        return isEqual(
            initialLoadedData[lang][filename],
            loadedData[lang][filename],
        )
    }, [initialLoadedData, loadedData, lang])

    return (
        <AdminContext.Provider value={{
            loadFile,
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
            areEqual,
        }}>
            <>{loading ? <Loading /> : token ? children : <LoginForm />}</>
        </AdminContext.Provider>
    )
}
