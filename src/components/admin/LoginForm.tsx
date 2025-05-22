import { useState } from "react"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { ButtonSubmit } from "@/components/admin/Button"

export function LoginForm() {
    const [token, setToken] = useState("")
    const [clicked, setClicked] = useState(false)
    const { loadFile } = useAdmin(TransFiles.common)
    const loginText = useI18n("button.login")
    const passwordText = useI18n("password")
    const loadingText = useI18n("loading")

    return (
        <div className="max-w-5xl bg-gray-100 dark:bg-gray-700 rounded py-3 mx-2 lg:mx-auto shadow-xl min-h-[300px] flex items-center justify-center">
            <form className="flex max-md:flex-col gap-4 md:max-w-1/2 mx-auto" onSubmit={async function (event) {
                event.preventDefault()
                setClicked(true)
                await loadFile(token)
            }}>
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
                <ButtonSubmit disabled={clicked}>
                    {clicked ? loadingText : loginText}
                </ButtonSubmit>
            </form>
        </div>
    )
}
