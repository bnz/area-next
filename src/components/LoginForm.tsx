import { useState } from "react"
import { TransFiles, useAdmin } from "@/components/AdminProvider"

export function LoginForm({ message }: { message?: string }) {
    const [token, setToken] = useState("")
    const { loadFile } = useAdmin()

    return (
        <div className="max-w-lg mx-auto">
            <div className="flex gap-4">
                <input
                    type="password"
                    placeholder="Password"
                    value={token}
                    onChange={function (e) {
                        setToken(e.target.value)
                    }}
                />
                <button type="button" className="button" onClick={async function () {
                    await loadFile(TransFiles.welcome, token)
                }}>
                    login
                </button>
            </div>
            {message && (
                <div>{message}</div>
            )}
        </div>
    )
}
