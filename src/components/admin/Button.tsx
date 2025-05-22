import { PropsWithChildren, MouseEventHandler } from "react"
import cx from "classnames"

type ButtonProps = PropsWithChildren<{
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	type?: "button" | "submit" | "reset"
	disabled?: boolean
}>

export function Button({ children, className, onClick, type = "button", disabled }: ButtonProps) {
	return (
		<button
			className={cx("button", className)}
			type={type as "button" | "submit" | "reset"}
			onClick={onClick as MouseEventHandler<HTMLButtonElement>}
			disabled={disabled as boolean}
		>
			{children}
		</button>
	)
}

export function ButtonSubmit({ children, className, disabled }: Pick<ButtonProps, "children" | "className" | "disabled">) {
	return (
		<Button type="submit" className={className} disabled={disabled}>
			{children}
		</Button>
	)
}

export function ButtonSimple({ children, className, onClick, disabled }: ButtonProps) {
	return (
		<button
			type="button"
			className={cx("cursor-pointer", className)}
			onClick={onClick as MouseEventHandler<HTMLButtonElement>}
			disabled={disabled as boolean}
		>
			{children}
		</button>
	)
}
