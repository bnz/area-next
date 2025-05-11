import { PropsWithChildren, MouseEventHandler } from "react"
import cx from "classnames"

type ButtonProps = PropsWithChildren<{
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}>

export function Button({ children, className, onClick }: ButtonProps) {
	return (
		<button
			className={cx("button", className)}
			type="button"
			onClick={onClick as MouseEventHandler<HTMLButtonElement>}
		>
			{children}
		</button>
	)
}
