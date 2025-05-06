import { ChangeEvent, useRef } from "react"

type DateTimeInputProps = {
	name: string
	onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
	defaultValue?: string
}

export function DateTimeInput({ name, onChange, defaultValue }: DateTimeInputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	function handleClick() {
		inputRef.current?.showPicker?.()
	}

	return (
		<input
			type="datetime-local"
			ref={inputRef}
			onClick={handleClick}
			className="cursor-pointer"
			name={name}
			onChange={onChange}
			defaultValue={defaultValue as string}
		/>
	)
}
