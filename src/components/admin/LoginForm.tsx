import { useState } from "react"
import { LOADED_DATA, SHA_DATA, TOKEN, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { Button, ButtonSubmit } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"
import { LogIn, X } from "lucide-react"
import { saveAdminStore } from "@/components/admin/getAdminStorage"

export function LoginForm() {
	const [token, setToken] = useState("")
	const [clicked, setClicked] = useState(false)
	const [error, setError] = useState(false)
	const { loadFile } = useAdmin(TransFiles.common)
	const loginText = useI18n("button.login")
	const passwordText = useI18n("password")
	const loadingText = useI18n("loading")

	return (
		<div className="min-h-[300px] flex flex-col items-center justify-center">
			<form
				className="flex max-md:flex-col gap-4 md:max-w-1/2 mx-auto"
				onSubmit={async function (event) {
					event.preventDefault()
					setError(false)
					setClicked(true)

					try {
						const a = await loadFile(token)

						if (a) {
						} else {
							setClicked(false)
							setError(true)
						}

					} catch (e) {
						console.error(e)
						setClicked(false)
					}
				}}
			>
				<input
					type="password"
					placeholder={passwordText}
					value={token}
					autoFocus
					className="max-md:text-center min-w-[300px]"
					onChange={function (e) {
						setToken(e.target.value)
					}}
				/>
				<ButtonSubmit disabled={clicked} className="icon">
					{clicked ? loadingText : loginText}
					<LogIn />
				</ButtonSubmit>
				<Button className="icon" onClick={function () {
					localStorage.removeItem(TOKEN)
					localStorage.removeItem(LOADED_DATA)
					localStorage.removeItem(SHA_DATA)
					saveAdminStore({ active: false })
					window.location.reload()
				}}>
					<X />
					<span>{useI18n("button.close")}</span>
				</Button>
			</form>
			<div className="py-3 text-red-500 h-10	">
				{error ? "Error!" : " "}
			</div>
		</div>
	)
}
