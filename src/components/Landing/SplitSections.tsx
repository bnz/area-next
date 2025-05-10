import { Split } from "@/components/admin/AdminProvider"
import cx from "classnames"

type SplitSectionsProps = {
	splits: Split[]
}

export function SplitSections({ splits }: SplitSectionsProps) {
	return splits.map(function ({ title, subTitle, image }, index) {
		const even = index === 0 || index % 2 === 0

		const Img = function () {
			return <img src={image} alt="" className="w-full aspect-video rounded-xl object-cover" />
		}

		return (
			<section key={index} className={cx(
				"py-24 px-6 sm:px-12",
				even ? "bg-gray-100 dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-900",
			)}>
				<div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
					{!even && (
						<Img />
					)}
					<div className="text-left">
						<h2 className="text-3xl font-bold mb-4">
							{title}
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							{subTitle}
						</p>
					</div>
					{even && (
						<Img />
					)}
				</div>
			</section>
		)
	})
}
