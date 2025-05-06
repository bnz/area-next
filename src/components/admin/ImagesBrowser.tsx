import { LOADED_DATA, TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useEffect, useState } from "react"

export function ImagesBrowser({ index, filename, onClose }: { index: number, filename: TransFiles, onClose: VoidFunction }) {
	const { getImagesList, setLoadedData, lang } = useAdmin()

	const [images, setImages] = useState<{
		path: string
		name: string
	}[]>([])

	useEffect(function () {
		(async function () {
			const a = await getImagesList()

			setImages((a as {
				path: string
				name: string
			}[]).map(function ({ name, path }) {
				return { name, path: path.replace("public/", "/") }
			}))
		})()
	}, [getImagesList, setImages])

	return (
		<div className="flex gap-3">
			{images.map(function ({ name, path }, i) {
				return (
					<img key={i} src={path} alt="" className="w-40 h-40 object-cover rounded cursor-pointer"
						onClick={function () {
							setLoadedData(function (prevState) {
								const clone = structuredClone(prevState)
								clone[lang][filename][index].image = path
								localStorage.setItem(LOADED_DATA, JSON.stringify(clone))
								return clone
							})
							onClose()
						}}
					/>
				)
			})}
		</div>
	)
}
