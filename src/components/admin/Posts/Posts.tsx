import { TransFiles } from "@/components/admin/AdminProvider"
import { PublishButton } from "@/components/admin/PublishButton"
import { AddPostForm } from "@/components/admin/Posts/AddPostForm"
import { PostsList } from "@/components/admin/Posts/PostsList"

export function Posts() {
	return (
		<div className="relative">
			<PostsList />
			<AddPostForm />
			<PublishButton filename={TransFiles.posts} />
		</div>
	)
}
