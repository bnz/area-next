import { Post as PostType, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import cx from "classnames"
import { ChangeEvent, useCallback, useState } from "react"
import { ImageSection } from "@/components/admin/ImageSection"
import { DeletePostButton } from "@/components/admin/Posts/DeletePostButton"
import { DateTimeInput } from "@/components/admin/DateTimeInput"
import { supportedLanguages } from "@/lib/i18n"
import { useI18n } from "@/components/I18nProvider"
import { Button } from "@/components/admin/Button"

export function Post({ index, image, title, excerpt, slug, content, datetime }: PostType & { index: number }) {
	const urlText = useI18n("label.url")
	const titleText = useI18n("label.title")
	const excerptText = useI18n("label.excerpt")
	const contentText = useI18n("label.content")

	const even = index === 0 || index % 2 === 0
	const [editMode, setEditMode] = useState(false)
	const { saveToLocalStorage, setLoadedData, lang } = useAdmin()

	const updateFormItem = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setLoadedData(function (prevState) {
			const clonedState = structuredClone(prevState)
			const keyName = event.target.name as keyof PostType

			clonedState[lang][TransFiles.posts][index] = {
				...clonedState[lang][TransFiles.posts][index],
				[keyName]: event.target.value,
			}

			if (keyName === "slug" || keyName === "datetime") {
				supportedLanguages.map(function (restLang) {
					if (!clonedState[restLang][TransFiles.posts][index]) {
						clonedState[restLang][TransFiles.posts][index] = {
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

			saveToLocalStorage(clonedState)

			return clonedState
		})
	}, [setLoadedData, lang, index])


	if (editMode) {
		return (
			<div
				key={index}
				className={cx(
					"grid grid-cols-[2fr_1fr] gap-3 px-3 pb-10 shadow-inner",
					even && "bg-gray-200 dark:bg-gray-800",
				)}
			>
				<div className="col-span-2 py-3 flex justify-between">
					<Button onClick={function () {
						setEditMode(false)
					}}>
						close edit
					</Button>
					<DeletePostButton index={index} />
				</div>
				<input required type="text" placeholder={urlText} defaultValue={slug} name="slug" onChange={updateFormItem} />
				<div className="rounded row-span-4 flex">
					<div className="flex-1 pr-5">
						<ImageSection
							image={image}
							index={index}
							filename={TransFiles.posts}
						/>
					</div>
					<div>

					</div>
				</div>
				<input required type="text" placeholder={titleText} defaultValue={title} name="title"
					onChange={updateFormItem} />
				<DateTimeInput name="datetime" onChange={updateFormItem} defaultValue={datetime} />
				<input required type="text" placeholder={excerptText} defaultValue={excerpt} name="excerpt"
					onChange={updateFormItem} />
				<textarea
					className="col-span-2"
					rows={10} required placeholder={contentText} defaultValue={content} name="content"
					onChange={updateFormItem}></textarea>
			</div>
		)
	}

	return (
		<div className={cx(
			"grid grid-cols-[1fr_100px_60px] lg:grid-cols-[1fr_100px_100px] grid-rows-[30px_1fr] p-2 gap-x-2",
			even && "bg-gray-200 dark:bg-gray-800",
		)}>
			<h3 className="font-bold text-lg">{title}</h3>
			<div className="row-span-2">
				<img src={image} alt="" className="rounded w-full h-auto" />
			</div>
			<div className="row-span-2 flex items-center justify-center">
				<button className="button" type="button" onClick={function () {
					setEditMode(true)
				}}>
					Edit
				</button>
			</div>
			<div>{excerpt}</div>
		</div>
	)
}
