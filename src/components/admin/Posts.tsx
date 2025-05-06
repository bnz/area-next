import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { PublishButton } from "@/components/admin/PublishButton"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ModalDialog } from "@/components/ModalDialog"
import { ImagesBrowser } from "@/components/admin/ImagesBrowser"
import { useI18n } from "@/components/I18nProvider"
import { Post } from "@/components/BlogPage"
import { DateTimeInput } from "@/components/admin/DateTimeInput"

const formDefaultValue: Post = {
	slug: "",
	title: "",
	image: "",
	excerpt: "",
	content: "",
	datetime: "",
}

export function Posts() {
	const { loadData, loadedData, setLoadedData, updateArrayData, lang } = useAdmin()

	useEffect(function () {
		void loadData(TransFiles.posts)
	}, [])

	const data = loadedData[TransFiles.posts]

	const [dialogOpen, setDialogOpen] = useState<number>(-1)
	const [confirmDialogOpen, setConfirmDialogOpen] = useState<number>(-1)
	const [addNew, setAddNew] = useState<boolean>(false)
	const [formData, setFormData] = useState<Post>(formDefaultValue)

	const onFormChange = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setFormData(function (prevState) {
			return {
				...prevState,
				[event.target.name]: event.target.value,
			}
		})
	}, [setFormData])

	const handleDeleteImage = useCallback(function (index: number) {
		return function () {
			setLoadedData(function (prevState) {
				const clone = structuredClone(prevState)
				clone[lang][TransFiles.posts][index].image = ""
				localStorage.setItem(LOADED_DATA, JSON.stringify(clone))
				return clone
			})
		}
	}, [lang, setLoadedData])

	return (
		<div className="relative">
			{data.map(function ({ slug, title, image, excerpt, content, datetime }, index) {
				return (
					<div
						key={index}
						className="grid grid-cols-[2fr_1fr] gap-3 border-b border-gray-200 dark:border-gray-800 py-6 mb-3"
					>
						<input
							type="text"
							placeholder="Url"
							defaultValue={slug}
							name="slug"
							onChange={updateArrayData(TransFiles.posts, index)}
						/>
						<div className="rounded row-span-4 flex">
							<div className="flex-1 pr-5">
								{image ? (
									<>
										<img src={image} alt="" className="rounded max-w-[200px]" />
										<div className="flex gap-3 p-3">
											<button type="button" className="button" onClick={handleDeleteImage(index)}>
												delete
											</button>
											<button type="button" className="button" onClick={function () {
												setDialogOpen(index)
											}}>
												replace
											</button>
										</div>
									</>
								) : (
									<>
										<ImageUploader index={index} />
										<div>~ или ~</div>
										<div>
											<button type="button" className="button" onClick={function () {
												setDialogOpen(index)
											}}>
												Выбрать
											</button>
										</div>
									</>
								)}
							</div>
							<div>
								<button type="button" className="button" onClick={function () {
									setConfirmDialogOpen(index)
								}}>
									X
								</button>
								{confirmDialogOpen > -1 && (
									<ModalDialog maxWidth="max-w-xl" open onClose={function () {
										setConfirmDialogOpen(-1)
									}}>
										<h5 className="text-gray-800 dark:text-gray-100 text-center p-5">
											Delete?
										</h5>
										<div className="flex justify-center items-center gap-3">
											<button type="button" className="button" onClick={function () {
												setConfirmDialogOpen(-1)
											}}>
												Cancel
											</button>
											<button type="button" className="button" onClick={function () {
												setLoadedData(function (prevState) {
													const clone = structuredClone(prevState)
													clone[lang][TransFiles.posts].splice(index, 1)
													localStorage.setItem(LOADED_DATA, JSON.stringify(clone))
													return clone
												})
												setConfirmDialogOpen(-1)
											}}>
												DELETE
											</button>
										</div>
									</ModalDialog>
								)}
							</div>
						</div>
						{dialogOpen > -1 && (
							<ModalDialog open onClose={function () {
								setDialogOpen(-1)
							}}>
								<ImagesBrowser
									index={dialogOpen}
									filename={TransFiles.posts}
									onClose={function () {
										setDialogOpen(-1)
									}}
								/>
							</ModalDialog>
						)}
						<input
							type="text"
							placeholder="Title"
							defaultValue={title}
							name="title"
							onChange={updateArrayData(TransFiles.posts, index)}
						/>
						<DateTimeInput
							name="datetime"
							onChange={updateArrayData(TransFiles.posts, index)}
							defaultValue={datetime}
						/>
						<input
							type="text"
							placeholder="Excerpt"
							defaultValue={excerpt}
							name="excerpt"
							onChange={updateArrayData(TransFiles.posts, index)}
						/>
						<textarea
							placeholder="Content"
							defaultValue={content}
							name="content"
							onChange={updateArrayData(TransFiles.posts, index)}
						></textarea>
					</div>
				)
			})}
			{addNew ? (
				<form
					className="flex flex-col gap-3 p-2.5 m-2.5 bg-gray-100 dark:bg-gray-700 rounded shadow-inner"
					onSubmit={function (event) {
						event.preventDefault()

						setLoadedData(function (prevState) {
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

							localStorage.setItem(LOADED_DATA, JSON.stringify(newState))

							return newState
						})

						setAddNew(false)
					}}
				>
					<input autoFocus type="text" placeholder="Url" name="slug" onChange={onFormChange} />
					<input type="text" placeholder="Title" name="title" onChange={onFormChange} />
					<DateTimeInput name="datetime" onChange={onFormChange} />
					<input type="text" placeholder="Excerpt" name="excerpt" onChange={onFormChange} />
					<textarea placeholder="Content" name="content" onChange={onFormChange}></textarea>
					<div className="flex gap-3">
						<button className="button" type="submit">
							Save
						</button>
						<button type="button" className="cursor-pointer" onClick={function () {
							setAddNew(function (prevState) {
								return !prevState
							})
							setFormData(formDefaultValue)
						}}>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<button type="button" className="button" onClick={function () {
					setAddNew(true)
				}}>
					{useI18n("button.add")}
				</button>
			)}
			<PublishButton filename={TransFiles.posts} />
		</div>
	)
}
