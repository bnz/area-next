import { useState } from "react"
import { TransFiles, useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"

export function LoginForm() {
    const [token, setToken] = useState("")
    const [clicked, setClicked] = useState(false)
    const { loadFile } = useAdmin()
    const loginText = useI18n("button.login")
    const passwordText = useI18n("password")
    const loadingText = useI18n("loading")

    return (
        <div className="max-w-lg mx-auto py-36">
            <form className="flex gap-4" onSubmit={async function (event) {
                event.preventDefault()
                setClicked(true)
                await loadFile(TransFiles.common, token)
            }}>
                <input
                    type="password"
                    placeholder={passwordText}
                    value={token}
                    autoFocus
                    onChange={function (e) {
                        setToken(e.target.value)
                    }}
                />
                <button disabled={clicked} type="submit" className="button">
                    {clicked ? loadingText : loginText}
                </button>
            </form>
        </div>
    )
}
