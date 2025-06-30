import { useState } from "react"
import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { ButtonSubmit } from "@/components/admin/Button"
import { TransFiles } from "@/components/admin/schemas/schemas"
import cx from "classnames"

export function LoginForm() {
    const [token, setToken] = useState("")
    const [clicked, setClicked] = useState(false)
    const { loadFile } = useAdmin(TransFiles.common)
    const loginText = useI18n("button.login")
    const passwordText = useI18n("password")
    const loadingText = useI18n("loading")

    return (
        <div className={cx(
            "min-h-[300px] flex items-center justify-center"
        )}>
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
