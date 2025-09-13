import { PublishButton } from "@/components/admin/PublishButton"
import { AddPostForm } from "@/components/admin/Posts/AddPostForm"
import { PostsList } from "@/components/admin/Posts/PostsList"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function Posts() {
	return (
		<div id="posts-section" className="relative">
			<PostsList />
			<AddPostForm />
			<PublishButton filename={TransFiles.posts} allLangs />
		</div>
	)
}
