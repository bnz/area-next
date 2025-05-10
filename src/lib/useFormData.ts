import { type ChangeEvent, useCallback, useState } from "react"

export function useFormData<T>(defaultValue: T): [T, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, () => void] {
	const [data, setData] = useState<T>(defaultValue)
	const onChange = useCallback(function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setData(function (prevState) {
			return {
				...prevState,
				[event.target.name]: event.target.value,
			}
		})
	}, [setData])
	const reset = useCallback(function () {
		setData(defaultValue)
	}, [setData, defaultValue])

	return [data, onChange, reset]
}
