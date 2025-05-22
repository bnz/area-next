import { useI18n } from "@/components/I18nProvider"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { LOADED_DATA, Split, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { Button, ButtonSimple, ButtonSubmit } from "@/components/admin/Button"

const formDefaultValue: Split = {
    title: "",
    subTitle: "",
    image: "",
}

export function AddSplitForm() {
    const addText = useI18n("button.add")
    const cancelText = useI18n("button.cancel")
    const saveText = useI18n("button.save")
    const titleText = useI18n("label.title")
    const subTitleText = useI18n("label.subTitle")

    const { setLoadedData, lang } = useAdmin()

    const [addNew, setAddNew] = useState<boolean>(false)
    const handleOpen = useCallback(function () {
        setAddNew(true)
    }, [setAddNew])

    const [formData, setFormData] = useState<Split>(formDefaultValue)
    const onFormChange = useCallback(function (event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(function (prevState) {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    }, [setFormData])

    const handleCancel = useCallback(function () {
        setAddNew(false)
        setFormData(formDefaultValue)
    }, [setAddNew, setFormData])

    const onSubmit = useCallback(function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoadedData(function (prevState) {
            const newState = {
                ...prevState,
                [lang]: {
                    ...prevState[lang],
                    [TransFiles.splits]: [
                        ...prevState[lang][TransFiles.splits],
                        formData,
                    ],
                },
            }
            localStorage.setItem(LOADED_DATA, JSON.stringify(newState))
            return newState
        })
        handleCancel()
    }, [handleCancel, setLoadedData, lang, formData])

    return (
        <>
            {addNew ? (
                <form
                    className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
                    onSubmit={onSubmit}
                >
                    <textarea placeholder={titleText} name="title" onChange={onFormChange}></textarea>
                    <textarea placeholder={subTitleText} name="subTitle" onChange={onFormChange}></textarea>
                    <div className="flex gap-3">
                        <ButtonSubmit>
                            {saveText}
                        </ButtonSubmit>
                        <ButtonSimple onClick={handleCancel}>
                            {cancelText}
                        </ButtonSimple>
                    </div>
                </form>
            ) : (
                <Button onClick={handleOpen}>
                    {addText}
                </Button>
            )}
        </>
    )
}
