import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { Post } from "@/components/admin/Posts/Post"

export function PostsList() {
	const { loadedData, loadData } = useAdmin(TransFiles.posts)

	useEffect(function () {
		void loadData()
	}, [])

	return loadedData.map(function (post, index) {
		return <Post key={index} {...post} index={index} />
	})
}
