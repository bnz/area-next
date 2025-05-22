"use client"

import { useState } from "react"
import Script from "next/script"
import { useAdmin } from "@/components/admin/AdminProvider"
import { useI18n } from "@/components/I18nProvider"
import { ButtonSubmit } from "@/components/admin/Button"

type ContactsFormProps = {
    token: string
    email: string
}

export function ContactsForm({ token }: ContactsFormProps) {
    const [message, setMessage] = useState<string>("")
    const { lang } = useAdmin()
    const sendingText = useI18n("sending")
    const messageSentText = useI18n("message.sent")
    const somethingWentWrongText = useI18n("something.went.wrong")
    const nameText = useI18n("input.name")
    const emailText = useI18n("input.email")
    const messageText = useI18n("input.message")
    const sendMessageText = useI18n("button.sendMessage")

    return (
        <>
            <Script key={lang} src="https://web3forms.com/client/script.js" async defer strategy="afterInteractive" />
            <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="flex flex-col gap-3 max-md:order-3 max-md:mb-12"
                onSubmit={async function (event) {
                    event.preventDefault()
                    setMessage(sendingText)
                    // @ts-ignore
                    const formData = new FormData(event.target)

                    formData.append("access_key", token)

                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData,
                    })

                    const data = await response.json()

                    if (data.success) {
                        setMessage(messageSentText)
                        // @ts-ignore
                        event.target.reset()
                    } else {
                        console.log("Error", data)
                        setMessage(somethingWentWrongText)
                    }
                }}
            >
                <input type="text" name="name" placeholder={nameText} required />
                <input type="email" name="email" placeholder={emailText} required />
                <textarea rows={6} name="message" required placeholder={messageText} />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                <div className="h-captcha self-center" data-captcha="true" />
                <ButtonSubmit className="self-center">
                    {sendMessageText}
                </ButtonSubmit>
                {message !== "" && (
                    <div>{message}</div>
                )}
            </form>
        </>
    )
}
