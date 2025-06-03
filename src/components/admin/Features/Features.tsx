import { PublishButton } from "@/components/admin/PublishButton"
import { FeaturesList } from "@/components/admin/Features/FeaturesList"
import { AddFeatureForm } from "@/components/admin/Features/AddFeatureForm"
import { TransFiles } from "@/components/admin/schemas/schemas"

export function Features() {
	return (
		<div className="relative">
			<div className="mb-5">
				<FeaturesList />
			</div>
			<div className="p-4">
				<AddFeatureForm />
			</div>
			<PublishButton filename={TransFiles.features} />
		</div>
	)
}
