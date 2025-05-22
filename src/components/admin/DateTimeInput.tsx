import { ChangeEvent, useRef } from "react"
import cx from "classnames"

type DateTimeInputProps = {
	name: string
	onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
	defaultValue?: string
	className?: string
}

export function DateTimeInput({ name, onChange, defaultValue, className }: DateTimeInputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	function handleClick() {
		inputRef.current?.showPicker?.()
	}

	return (
		<input
			required={false}
			type="datetime-local"
			ref={inputRef}
			onClick={handleClick}
			className={cx("cursor-pointer", className)}
			name={name}
			onChange={onChange}
			defaultValue={defaultValue as string}
		/>
	)
}
