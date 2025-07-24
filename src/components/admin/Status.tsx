import { useAdmin } from "@/components/admin/AdminProvider"
import { useEffect, useState } from "react"

function useGetStatus() {
	const { checkStatus } = useAdmin()
	const [status, setStatus] = useState(false)

	useEffect(function () {
		let isMounted = true

		async function pollStatus() {
			console.log("pollStatus")
			const s = await checkStatus()

			if (!isMounted) {
				return
			}

			if (s) {
				setStatus(true)
			} else {
				setTimeout(pollStatus, 2000)
			}
		}

		void pollStatus()

		return function () {
			isMounted = false
		}
	}, [checkStatus])

	return status
}

export function Status() {
	const valid = useGetStatus()

	return (
		<div>
			<span>{valid ? "available" : "in progress"}</span>
			<button className="ml-5" onClick={function () {

			}}>
				check
			</button>
		</div>
	)
}
