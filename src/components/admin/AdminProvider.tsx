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
import { BRANCH, getActionRuns, getImagesUrl, getImageUrl, getUrl } from "@/lib/getUrl"
import { Buffer } from "buffer"
import { LoginForm } from "@/components/admin/LoginForm"
import { type AvailableLangs, supportedLanguages } from "@/lib/i18n"
import debounce from "lodash.debounce"
import isEqual from "lodash.isequal"
import { Loading } from "@/components/admin/Loading"
import {
    defaultShaItemSchema,
    FeatureItem, ImageItem,
    loadedDataSchema,
    PostItem,
    ShaData,
    SplitItem,
    TransFiles,
} from "@/components/admin/schemas/schemas"

function defaultShaItem() {
    return {
        [TransFiles.common]: "",
        [TransFiles.translations]: "",
        [TransFiles.features]: "",
        [TransFiles.posts]: "",
        [TransFiles.splits]: "",
    }
}

const defaultShaData: ShaData = {
    en: defaultShaItem(),
    lv: defaultShaItem(),
    ru: defaultShaItem(),
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

function defaultLoadedDataItem(): LoadedDataItem {
    return {
        [TransFiles.common]: {},
        [TransFiles.translations]: {},
        [TransFiles.features]: [],
        [TransFiles.posts]: [],
        [TransFiles.splits]: [],
    }
}

const defaultLoadedData: LoadedData = {
    en: defaultLoadedDataItem(),
    lv: defaultLoadedDataItem(),
    ru: defaultLoadedDataItem(),
}

type AdminContextProps = {
    loadFile(filename: TransFiles, newToken?: string): Promise<{
        content: string
        sha: string
    } | undefined>
    logOut: VoidFunction
    loadedData: LoadedDataItem
    setLoadedData: Dispatch<SetStateAction<LoadedData>>
    loadData(filename: TransFiles, lang?: AvailableLangs): Promise<void>
    saveData(filename: TransFiles, allLangs?: boolean): Promise<void>
    updateRecordData(key: string): (event: ChangeEvent<HTMLTextAreaElement>) => void
    updateArrayData(filename: TransFiles, id: string): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    lang: AvailableLangs
    publishLoading: boolean
    setPublishLoading: Dispatch<SetStateAction<boolean>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadImage(file: File): Promise<any>
    loadImagesList(): Promise<void>
    imagesList: ImageItem[]
    removeFromArrayData(filename: TransFiles.posts | TransFiles.features | TransFiles.splits, id: string): void
    saveToLocalStorage(obj: LoadedData): void
    areEqual(filename: TransFiles, id?: string): boolean
    updateImage(filename: TransFiles.posts | TransFiles.splits, id: string, path: string, allLangs?: boolean): void
    checkStatus(): Promise<boolean>
    availableStatus: boolean
    setAvailableStatus: Dispatch<SetStateAction<boolean>>
}

const AdminContext = createContext<AdminContextProps>({
    async loadFile() {
        return undefined
    },
    logOut() {
    },
    loadedData: defaultLoadedDataItem(),
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
    async loadImagesList() {
    },
    imagesList: [],
    removeFromArrayData() {
    },
    saveToLocalStorage() {
    },
    areEqual() {
        return false
    },
    updateImage() {
    },
    async checkStatus() {
        return false
    },
    availableStatus: false,
    setAvailableStatus() {
    },
})

// type ArgsWithoutFirst<T> = Parameters<T> extends [infer First, ...infer Rest] ? Rest : never
// type Return<T extends keyof AdminContextProps> = ReturnType<AdminContextProps[T]>
// type Args<T extends keyof AdminContextProps> = ArgsWithoutFirst<AdminContextProps[T]>

type GetDataType<T extends TransFiles> = T extends keyof LoadedDataItem ? LoadedDataItem[T] : never

type AdminContextWithFilenameProps<T extends TransFiles> =
    Omit<AdminContextProps, "loadFile" | "loadData" | "loadedData" | "saveData" | "updateArrayData" | "areEqual" | "updateImage">
    & {

    // loadFile(...args: Args<"loadFile">): Return<"loadFile">
    loadFile(newToken?: string): Promise<{ content: string, sha: string } | undefined>

    // loadData(): Return<"loadData">
    loadData(lang?: AvailableLangs): Promise<void>

    // saveData(...args: Args<"saveData">): Return<"saveData">
    saveData(allLangs?: boolean): Promise<void>

    loadedData: GetDataType<T>

    // updateArrayData(...args: Args<"updateArrayData">): Return<"updateArrayData">
    updateArrayData(id: string): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

    // removeFromArrayData(...args: Args<"removeFromArrayData">): Return<"removeFromArrayData">
    removeFromArrayData(id: string): void

    // areEqual(...args: Args<"areEqual">): Return<"areEqual">
    areEqual(id?: string): boolean

    updateImage(id: string, path: string, allLangs?: boolean): void
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
            loadData(lang) {
                return context.loadData(filename!, lang)
            },
            saveData(allLangs?: boolean) {
                return context.saveData(filename!, allLangs)
            },
            loadedData: context.loadedData[filename!],
            updateArrayData(id: string) {
                return context.updateArrayData(filename!, id)
            },
            areEqual(id?: string) {
                return context.areEqual(filename!, id)
            },
            ...(filename === TransFiles.posts || filename === TransFiles.splits ? {
                updateImage(id: string, path: string, allLangs?: boolean) {
                    return context.updateImage(filename!, id, path, allLangs)
                },
            } : {}),
            ...(filename === TransFiles.posts || filename === TransFiles.features || filename === TransFiles.splits ? {
                removeFromArrayData(id: string) {
                    return context.removeFromArrayData(filename!, id)
                },
            } : {}),
        } : {}),
    } as AdminContextWithFilenameProps<T>
}

const saveToLocalStorage = debounce(function (obj: LoadedData) {
    try {
        localStorage.setItem(LOADED_DATA, JSON.stringify(obj))
    } catch (e) {
        console.log(e)
    }
}, 400)

export const LOADED_DATA = "loaded-data"
export const SHA_DATA = "sha-data"
export const TOKEN = "token"

export function AdminProvider({ children, lang }: PropsWithChildren<{ lang: AvailableLangs }>) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [, setSha] = useState<ShaData>(defaultShaData)
    const [loadedData, setLoadedData] = useState<LoadedData>(defaultLoadedData)
    const [initialLoadedData, setInitialLoadedData] = useState<LoadedData>(defaultLoadedData)
    const [publishLoading, setPublishLoading] = useState(false)
    const [imagesList, setImagesList] = useState<ImageItem[]>([])
    const [availableStatus, setAvailableStatus] = useState(false)

    useEffect(function () {
        try {
            const dataStorage = localStorage.getItem(LOADED_DATA)

            if (dataStorage) {
                const parsed = JSON.parse(dataStorage || "{}")

                // console.log("init set", { parsed })

                // setLoadedData(loadedDataSchema.parse(parsed))
                setLoadedData(parsed)
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

    const changeSha = useCallback(function (filename: TransFiles, sha: string, language: AvailableLangs) {
        setSha(function (prevState) {
            const newState = defaultShaItemSchema.parse({
                ...prevState,
                [language]: {
                    ...prevState[language],
                    [filename]: sha,
                },
            })
            localStorage.setItem(SHA_DATA, JSON.stringify(newState))
            return newState
        })
    }, [setSha])

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

    const publishData = useCallback(async function (filename: TransFiles, stringToSave: string, sha: string, _lang: AvailableLangs) {
        try {
            const base64Content = Buffer.from(stringToSave).toString("base64")

            const res = await fetch(getUrl(`${_lang}/${filename}`), {
                method: "PUT",
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `i18n update from admin (/${_lang}/${filename}.json)`,
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
    }, [token])

    const loadData = useCallback(async function (filename: TransFiles, forceLang: AvailableLangs = lang) {
        const dataExists = Object.keys(loadedData[forceLang][filename]).length > 0
        const initialDataExists = Object.keys(initialLoadedData[forceLang][filename]).length > 0

        if (dataExists && initialDataExists) {
            return
        }

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
                        [forceLang]: {
                            ...prevState[forceLang],
                            [filename]: JSON.parse(data.content),
                        },
                    })
                    saveToLocalStorage(newState)
                    return newState
                })
                changeSha(filename, data.sha, forceLang)
            }

            if (!initialDataExists) {
                setInitialLoadedData(function (prevState) {
                    return loadedDataSchema.parse({
                        ...prevState,
                        [forceLang]: {
                            ...prevState[forceLang],
                            [filename]: JSON.parse(data.content),
                        },
                    })
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [loadFile, loadedData, initialLoadedData, setLoadedData, lang, setInitialLoadedData, setLoading, changeSha])

    const getShaFor = useCallback(async (filename: TransFiles, _lang: AvailableLangs) => {
        const res = await fetch(getUrl(`${_lang}/${filename}`, `?ref=${BRANCH}`), {
            headers: { Authorization: `token ${token}` },
        })
        const data = await res.json()
        if (!res.ok || data?.status) {
            throw new Error(`Failed to load sha for ${_lang}/${filename}`)
        }
        return data.sha as string
    }, [token])

    const putWithRetry = useCallback(async (filename: TransFiles, _lang: AvailableLangs, body: unknown) => {
        let currentSha = await getShaFor(filename, _lang)
        let income = await publishData(filename, JSON.stringify(body, null, 2), currentSha, _lang)
        if (income) {
            return income
        }
        currentSha = await getShaFor(filename, _lang)
        income = await publishData(filename, JSON.stringify(body, null, 2), currentSha, _lang)
        return income
    }, [getShaFor, publishData])

    const saveData = useCallback(async function (filename: TransFiles, allLangs?: boolean) {
        try {
            setAvailableStatus(false)
            setPublishLoading(true)
            const langsToGo = allLangs ? supportedLanguages : [lang]
            for (const _lang of langsToGo) {
                const body = loadedData[_lang][filename]
                const income = await putWithRetry(filename, _lang, body)
                if (income) {
                    changeSha(filename, income.sha, _lang)
                } else {
                    console.error(`Failed to commit /${_lang}/${filename}.json even after retry`)
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setPublishLoading(false)
        }
    }, [loadedData, lang, changeSha, setAvailableStatus, setPublishLoading, putWithRetry])

    const logOut = useCallback(function () {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(LOADED_DATA)
        localStorage.removeItem(SHA_DATA)
        window.location.reload()
    }, [])

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
    }, [lang, setLoadedData])

    const updateArrayData = useCallback(function (filename: TransFiles.features | TransFiles.posts | TransFiles.splits, id: string) {
        return function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
            setLoadedData(function (prevState) {
                const arrayClone = structuredClone(prevState[lang][filename])
                const itemIndex = getById(arrayClone, id)
                if (itemIndex > -1) {
                    // @ts-expect-error wrong types
                    arrayClone[itemIndex][event.target.name] = event.target.value
                    const newState = loadedDataSchema.parse({
                        ...prevState,
                        [lang]: {
                            ...prevState[lang],
                            [filename]: arrayClone,
                        },
                    })
                    saveToLocalStorage(newState)
                    return newState
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return prevState as any
            })
        }
    }, [lang, setLoadedData])

    const uploadImage = useCallback(async function (file: File) {
        const reader = new FileReader()

        const base64Content: string = await new Promise(function (resolve, reject) {
            reader.onloadend = function () {
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

    const loadImagesList = useCallback(async function () {
        const images = await (await fetch(getImagesUrl(), {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        })).json() as ImageItem[]
        setImagesList(images.map(function ({ name, path }) {
            return {
                name,
                path: path.replace("public/", "/"),
            }
        }))
    }, [token, setImagesList])

    const removeFromArrayData = useCallback(function (filename: TransFiles.posts | TransFiles.features | TransFiles.splits, id: string) {
        setLoadedData(function (prevState) {
            const cloned = structuredClone(prevState)
            const itemIndex = getById(cloned[lang][filename], id)
            cloned[lang][filename].splice(itemIndex, 1)
            const validated = loadedDataSchema.parse(cloned)
            saveToLocalStorage(validated)
            return validated
        })
    }, [setLoadedData])

    const areEqual = useCallback(function (filename: TransFiles, id?: string): boolean {
        if (id !== undefined && (filename === TransFiles.features || filename === TransFiles.posts || filename === TransFiles.splits)) {
            const initItemIndex = getById(initialLoadedData[lang][filename], id)
            const loadedItemIndex = getById(loadedData[lang][filename], id)

            return isEqual(
                initialLoadedData[lang][filename][initItemIndex],
                loadedData[lang][filename][loadedItemIndex],
            )
        }

        return isEqual(
            initialLoadedData[lang][filename],
            loadedData[lang][filename],
        )
    }, [initialLoadedData, loadedData, lang])

    const updateImage = useCallback(function (filename: TransFiles.posts | TransFiles.splits, id: string, path: string, allLangs?: boolean) {
        setLoadedData(function (prevState) {
            const clone = structuredClone(prevState)
            const index = getById(clone[lang][filename], id)
            if (allLangs && filename === TransFiles.posts) {
                for (const _lang of supportedLanguages) {
                    const { slug } = clone[lang][filename][index]
                    const itemIndex = clone[_lang][filename].findIndex(function ({ slug: _slug }) {
                        return _slug === slug
                    })
                    if (itemIndex > -1) {
                        clone[_lang][filename][itemIndex].image = path
                    } else {
                        console.error(`cannot update image for '/${_lang}/${slug}'`)
                    }
                }
            } else {
                clone[lang][filename][index].image = path
            }
            const validated = loadedDataSchema.parse(clone)
            saveToLocalStorage(validated)
            return validated
        })
    }, [setLoadedData, lang])

    const checkStatus = useCallback(async function () {

        const res = await fetch(getActionRuns(), {
            // const res = await fetch("/api/status", {
            headers: {
                Authorization: `token ${token}`,
            },
        })

        const data = await res.json()

        if (data.workflow_runs.length > 0) {
            const { status, name, conclusion } = data.workflow_runs[0]

            // console.log({ status, name, conclusion })

            if (["pages build and deployment", "Deploy to GitHub Pages"].includes(name)
                && status === "completed"
                && conclusion !== "success") {
                // {
                // 	"status": "completed",
                // 	"name": "Deploy to GitHub Pages",
                // 	"conclusion": "failure"
                // }
                // report to me
            }


            return ["pages build and deployment", "Build & Deploy (GitHub Pages)"].includes(name) && ["completed", "success"].includes(status)
        }

        return false
    }, [token])

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
            loadImagesList,
            imagesList,
            removeFromArrayData,
            saveToLocalStorage,
            areEqual,
            updateImage,
            checkStatus,
            availableStatus,
            setAvailableStatus,
        }}>
            <>{loading
                ? <Loading />
                : token
                    ? children
                    : <LoginForm />
            }</>
        </AdminContext.Provider>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getById(collection: any[], id: string) {
    return collection.findIndex(function ({ id: itemId }) {
        return itemId === id
    })
}
