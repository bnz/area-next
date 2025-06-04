import { useAdmin } from "@/components/admin/AdminProvider"
import cx from "classnames"
import { ChangeEvent, useCallback, useState } from "react"
import { ImageSection } from "@/components/admin/ImageSection"
import { DeletePostButton } from "@/components/admin/Posts/DeletePostButton"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { supportedLanguages } from "@/lib/i18n"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"
import { formatDate } from "@/lib/formatDate"
import { loadedDataSchema, PostItem, TransFiles } from "@/components/admin/schemas/schemas"

export function Post({ index, image, title, excerpt, slug, content, datetime }: PostItem & { index: number }) {
    const urlText = useI18n("label.url")
    const titleText = useI18n("label.title")
    const excerptText = useI18n("label.excerpt")
    const contentText = useI18n("label.content")
    const editText = useI18n("button.edit")
    const doneEditText = useI18n("button.done.edit")
    const editedText = useI18n("label.edited")

    const even = index === 0 || index % 2 === 0
    const [editMode, setEditMode] = useState(false)
    const { saveToLocalStorage, setLoadedData, lang, areEqual } = useAdmin(TransFiles.posts)

    const updateFormItem = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        console.log("updateFormItem")
        setLoadedData(function (prevState) {
            const clonedState = structuredClone(prevState)
            const keyName = event.target.name as keyof PostItem

            clonedState[lang][TransFiles.posts][index] = {
                ...clonedState[lang][TransFiles.posts][index],
                [keyName]: event.target.value,
            }

            if (keyName === "slug" || keyName === "datetime") {
                supportedLanguages.map(function (restLang) {
                    if (!clonedState[restLang][TransFiles.posts][index]) {
                        clonedState[restLang][TransFiles.posts][index] = {
                            id: "",
                            slug: "",
                            datetime: "",
                            title: "",
                            excerpt: "",
                            content: "",
                            image: "",
                        }
                    }
                    clonedState[restLang][TransFiles.posts][index][keyName] = event.target.value
                })
            }

            const validated = loadedDataSchema.parse(clonedState)

            saveToLocalStorage(validated)

            return validated
        })
    }, [setLoadedData, lang, index])

    const equal = areEqual(index)

    if (editMode) {
        return (
            <div
                key={index}
                className={cx(
                    "grid",
                    "md:grid-cols-[200px_1fr_100px]",
                    "md:grid-rows-[60px_40px_40px_minmax(40px,_100px)_1fr]",

                    "[&>[name='title']]:col-span-2",

                    // desktop
                    "md:[&>[data-actions]]:row-span-2",
                    "md:[&>[data-image]]:row-span-3",
                    // datetime goes here
                    "md:[&>[name='slug']]:col-span-2",
                    "md:[&>[name='excerpt']]:col-span-2",
                    "md:[&>[name='content']]:col-span-3",

                    // mobile
                    "max-md:grid-cols-2",
                    "max-md:[&>[name='title']]:order-1",
                    "max-md:[&>[data-actions]]:order-3",
                    "max-md:[&>[data-image]]:order-2",
                    "max-md:[&>[name='datetime']]:order-4",
                    "max-md:[&>[name='datetime']]:col-span-2",
                    "max-md:[&>[name='slug']]:order-5",
                    "max-md:[&>[name='slug']]:col-span-2",
                    "max-md:[&>[name='excerpt']]:order-6",
                    "max-md:[&>[name='excerpt']]:col-span-2",
                    "max-md:[&>[name='content']]:order-7",
                    "max-md:[&>[name='content']]:col-span-2",

                    "gap-3",
                    "px-3 py-10 shadow-inner",
                    even && "bg-gray-200 dark:bg-gray-800",
                )}
            >
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

                <div data-actions={true} className="flex flex-col gap-3 items-end justify-between">
                    <Button onClick={function () {
                        setEditMode(false)
                    }}>
                        {doneEditText}
                    </Button>
                    <DeletePostButton index={index} />
                </div>

                <div data-image={true} className="rounded flex flex-col">
                    <ImageSection
                        image={image}
                        index={index}
                        filename={TransFiles.posts}
                    />
                </div>

                <DateTimeInput
                    name="datetime"
                    onChange={updateFormItem}
                    defaultValue={datetime}
                />

                <input
                    required
                    type="text"
                    placeholder={urlText}
                    defaultValue={slug}
                    name="slug"
                    onChange={updateFormItem}
                />

                <textarea
                    required
                    placeholder={excerptText}
                    defaultValue={excerpt}
                    name="excerpt"
                    onChange={updateFormItem}
                />

                <textarea
                    rows={10}
                    required
                    placeholder={contentText}
                    defaultValue={content}
                    name="content"
                    onChange={updateFormItem}
                />
            </div>
        )
    }

    return (
        <div className={cx(
            "max-md:flex max-md:flex-col",
            "md:grid md:grid-cols-[200px_1fr_1fr_100px]",
            "md:grid-rows-[30px_30px_1fr]",
            "max-md:p-3 md:p-5 max-md:gap-x-3 md:gap-x-5",
            even && "bg-gray-200 dark:bg-gray-800",
        )}>
            <h3 className="font-bold text-lg col-span-2 order-2 truncate">
                {title}
            </h3>
            <h3 className="col-span-2 order-4 italic text-sm">{formatDate(datetime)}</h3>
            <div className="col-span-2 order-5">{excerpt}</div>
            <div className="row-span-3 order-1">
                {image && (
                    <img src={image} alt="" className="rounded-md w-full h-auto" />
                )}
            </div>
            <div className="max-md:order-5 md:order-3 row-span-3 flex items-center justify-center relative">
                {!equal && (
                    <div
                        className="absolute right-24 top-0 text-red-500 italic whitespace-nowrap bg-gray-300 dark:bg-gray-900 rounded p-1">
                        {editedText}
                    </div>
                )}
                <Button onClick={function () {
                    setEditMode(true)
                }}>
                    {editText}
                </Button>
            </div>
        </div>
    )
}
