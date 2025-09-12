import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect } from "react"
import { useI18n } from "@/components/I18nProvider"
import { CloudCheck, Loader, RefreshCw } from "lucide-react"
import cx from "classnames"

export function Status() {
	const buttonCheck = useI18n("button.check")

	const { checkStatus, availableStatus, setAvailableStatus } = useAdmin()

	useEffect(function () {
		let isMounted = true

		async function pollStatus() {
			const s = await checkStatus()

			if (!isMounted) {
				return
			}

			if (s) {
				setAvailableStatus(true)
			} else {
				// setTimeout(pollStatus, 2000)
			}
		}

		void pollStatus()

		return function () {
			isMounted = false
		}
	}, [checkStatus, setAvailableStatus])

	async function pollStatus() {
		const s = await checkStatus()

		if (s) {
			setAvailableStatus(true)
		} else {
			setTimeout(pollStatus, 2000)
		}
	}

	return (
		<button
			title={buttonCheck}
			className="button-status group/button"
			disabled={!availableStatus}
			onClick={function () {
				setAvailableStatus(false)
				void pollStatus()
			}}
		>
			{availableStatus ? (
				<CloudCheck size={30} className="text-green-500 block group-hover/button:hidden" />
			) : (
				<Loader size={30} className="text-indigo-800 animate-spin origin-center [animation-duration:3s]" />
			)}
			<RefreshCw size={30} className={cx("hidden", availableStatus && "group-hover/button:block")} />
		</button>
	)
}
