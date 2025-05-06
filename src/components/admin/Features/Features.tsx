import { TransFiles } from "@/components/admin/AdminProvider"
import { PublishButton } from "@/components/admin/PublishButton"
import { FeaturesList } from "@/components/admin/Features/FeaturesList"
import { AddFeatureForm } from "@/components/admin/Features/AddFeatureForm"

export function Features() {
	return (
		<div className="relative">
			<div className="mb-5">
				<FeaturesList />
			</div>
			<div className="py-3 border-t border-gray-300 dark:border-gray-700">
				<AddFeatureForm />
			</div>
			<PublishButton filename={TransFiles.features} />
		</div>
	)
}
