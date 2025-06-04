import { type FormEvent, useCallback, useState } from "react"
import { useAdmin } from "@/components/admin/AdminProvider"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { useI18n } from "@/components/I18nProvider"
import { supportedLanguages } from "@/lib/i18n"
import { useFormData } from "@/lib/useFormData"
import { Button, ButtonSimple, ButtonSubmit } from "@/components/admin/Button"
import { loadedDataSchema, PostItem, postSchema, TransFiles } from "@/components/admin/schemas/schemas"
import { makeId } from "@/lib/makeId"

const formDefaultValue: PostItem = {
    id: "",
    slug: "",
    title: "",
    image: "",
    excerpt: "",
    content: "",
    datetime: "",
}

export function AddPostForm() {
    const addText = useI18n("button.add")
    const cancelText = useI18n("button.cancel")
    const saveText = useI18n("button.save")
    const urlText = useI18n("label.url")
    const titleText = useI18n("label.title")
    const excerptText = useI18n("label.excerpt")
    const contentText = useI18n("label.content")
    const slugUniquerText = useI18n("error.message.slug.uniquer")

    const { loadedData, setLoadedData, lang, saveToLocalStorage } = useAdmin(TransFiles.posts)
    const [addNew, setAddNew] = useState<boolean>(false)
    const [formData, onFormChange, resetFormData] = useFormData<PostItem>(formDefaultValue)

    const [formErrors, setFormErrors] = useState<Partial<Record<keyof PostItem, string>>>({})

    const handleOpen = useCallback(function () {
        setAddNew(true)
    }, [setAddNew])

    const handleCancel = useCallback(function () {
        setAddNew(false)
        resetFormData()
    }, [setAddNew, resetFormData])

    const onSubmit = useCallback(function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const existingSlugs = loadedData.map(function ({ slug }) {
            return slug
        })

        if (existingSlugs.includes(formData.slug)) {
            setFormErrors({ slug: slugUniquerText })
            return
        }

        setLoadedData(function (prevState) {
            const restLangs = supportedLanguages.filter(function (l) {
                return l !== lang
            })

            formData.id = makeId()

            const newState = {
                ...prevState,
                [lang]: {
                    ...prevState[lang],
                    [TransFiles.posts]: [
                        ...prevState[lang][TransFiles.posts],
                        formData,
                    ],
                },
            }

            console.log({ formData })

            const newIndex = newState[lang][TransFiles.posts].length - 1

            let clonedState = structuredClone(newState)

            restLangs.map(function (restLang) {
                if (clonedState[restLang][TransFiles.posts][newIndex]) {
                    clonedState[restLang][TransFiles.posts][newIndex].slug = formData.slug
                    clonedState[restLang][TransFiles.posts][newIndex].datetime = formData.datetime
                } else {
                    clonedState[restLang][TransFiles.posts][newIndex] = {
                        id: makeId(),
                        slug: formData.slug,
                        datetime: formData.datetime,
                        image: "",
                        content: "",
                        excerpt: "",
                        title: "",
                    }
                }
            })

            saveToLocalStorage(clonedState)

            return clonedState
        })
        handleCancel()
    }, [loadedData, handleCancel, setLoadedData, lang, formData, saveToLocalStorage, setFormErrors, slugUniquerText])

    return addNew ? (
        <form
            className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
            onSubmit={onSubmit}
        >
            <input required={true} autoFocus type="text" placeholder={urlText} name="slug" onChange={onFormChange} />
            {formErrors.slug && (
                <div className="text-red-500 italic">{formErrors.slug}</div>
            )}
            <input required={true} type="text" placeholder={titleText} name="title" onChange={onFormChange} />
            <DateTimeInput name="datetime" onChange={onFormChange} />
            <input required={true} type="text" placeholder={excerptText} name="excerpt" onChange={onFormChange} />
            <textarea required={true} placeholder={contentText} name="content" onChange={onFormChange}></textarea>
            <div className="flex gap-3">
                <ButtonSubmit>
                    {saveText}
                </ButtonSubmit>
                <ButtonSimple className="cursor-pointer" onClick={handleCancel}>
                    {cancelText}
                </ButtonSimple>
            </div>
        </form>
    ) : (
        <div className="max-md:p-2 md:p-5 border-y border-y-gray-200 dark:border-y-gray-800">
            <Button onClick={handleOpen}>
                {addText}
            </Button>
        </div>
    )
}
