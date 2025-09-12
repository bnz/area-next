import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { TransFiles } from "@/components/admin/schemas/schemas"
import Image from "next/image"

type ImagesBrowserProps = {
    id: string
    filename: TransFiles.posts | TransFiles.splits
    onClose: VoidFunction
}

export function ImagesBrowser({ id, filename, onClose }: ImagesBrowserProps) {
    const { loadImagesList, imagesList, updateImage } = useAdmin(filename)

    useEffect(function () {
        void loadImagesList()
    }, [loadImagesList])

    return (
        <div className="flex gap-3 flex-wrap">
            {imagesList.map(function ({ path }, i) {
                return (
                    <Image
                        width={100}
                        height={100}
                        key={i}
                        src={path}
                        alt=""
                        className="w-40 h-40 object-cover rounded cursor-pointer hover:shadow-xl"
                        onClick={function () {
                            updateImage(id, path)
                            onClose()
                        }}
                    />
                )
            })}
        </div>
    )
}
