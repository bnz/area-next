import { useAdmin } from "@/components/admin/AdminProvider"
import cx from "classnames"
import { type ChangeEvent, useCallback, useState } from "react"
import { ImageSection } from "@/components/admin/ImageSection"
import { DeletePostButton } from "@/components/admin/Posts/DeletePostButton"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { supportedLanguages } from "@/lib/i18n"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { formatDate } from "@/lib/formatDate"
import { loadedDataSchema, type PostItem, TransFiles } from "@/components/admin/schemas/schemas"
import { useToggle } from "@/lib/useToggle"

export function Post({ id, image, title, excerpt, slug, content, datetime, even }: PostItem & { even: boolean }) {
    const urlText = useI18n("label.url")
    const titleText = useI18n("label.title")
    const excerptText = useI18n("label.excerpt")
    const contentText = useI18n("label.content")
    const editText = useI18n("button.edit")
    const doneEditText = useI18n("button.done.edit")
    const editedText = useI18n("label.edited")

    const [editMode, toggle] = useToggle()
    const { saveToLocalStorage, setLoadedData, lang, areEqual } = useAdmin(TransFiles.posts)

    const updateFormItem = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setLoadedData(function (prevState) {
            const clonedState = structuredClone(prevState)
            const keyName = event.target.name as keyof PostItem

            // clonedState[lang][TransFiles.posts][index] = {
            //     ...clonedState[lang][TransFiles.posts][index],
            //     [keyName]: event.target.value,
            // }

            if (keyName === "slug" || keyName === "datetime") {
                supportedLanguages.map(function (restLang) {
                    // if (!clonedState[restLang][TransFiles.posts][index]) {
                    //     clonedState[restLang][TransFiles.posts][index] = {
                    //         id: "",
                    //         slug: "",
                    //         datetime: "",
                    //         title: "",
                    //         excerpt: "",
                    //         content: "",
                    //         image: "",
                    //     }
                    // }
                    // clonedState[restLang][TransFiles.posts][index][keyName] = event.target.value
                })
            }

            const validated = loadedDataSchema.parse(clonedState)

            saveToLocalStorage(validated)

            return validated
        })
    }, [setLoadedData, lang])

    const equal = areEqual(id)

    if (editMode) {
        return (
            <div className={cx("admin-post-edit", { even })}>
                <input
                    required
                    type="text"
                    placeholder={titleText}
                    defaultValue={title}
                    name="title"
                    onChange={updateFormItem}
                    autoFocus
                    className="text-xl"
                />
                <div>
                    <Button onClick={toggle}>{doneEditText}</Button>
                    <DeletePostButton id={id} />
                </div>
                <div>
                    <ImageSection
                        image={image}
                        id={id}
                        index={0 /* TODO */}
                        filename={TransFiles.posts}
                    />
                </div>
                <DateTimeInput
                    name="datetime"
                    onChange={updateFormItem}
                    defaultValue={datetime}
                />
                <input
                    type="text"
                    required
                    placeholder={urlText}
                    defaultValue={slug}
                    name="slug"
                    onChange={updateFormItem}
                />
                <textarea
                    name="excerpt"
                    required
                    placeholder={excerptText}
                    defaultValue={excerpt}
                    onChange={updateFormItem}
                />
                <textarea
                    name="content"
                    rows={10}
                    required
                    placeholder={contentText}
                    defaultValue={content}
                    onChange={updateFormItem}
                />
            </div>
        )
    }

    return (
        <div className={cx("admin-post", { even })}>
            <h3>{title}</h3>
            <h4>{formatDate(datetime)}</h4>
            <div>{excerpt}</div>
            <div>{image && <img src={image} alt="" />}</div>
            <div>
                <Button onClick={toggle}>
                    {editText}
                </Button>
                {!equal && <div>{editedText}</div>}
            </div>
        </div>
    )
}
