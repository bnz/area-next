import { sleep } from "@/helpers/sleep"

export async function fetchStub(url: string, options: object) {
    const parts = url.split("/")
    const lang = parts.at(-2)
    const file = parts.at(-1)

    const text = await (await fetch("/" + ["data", lang, file].join("/"))).json()

    // await sleep(1000)

    return {
        async json(): Promise<{
            status?: number
            content: string
            sha: string
        }> {
            return {
                content: Buffer.from(JSON.stringify(text), "utf8").toString("base64"),
                sha: "",
            }
        },
    }
}
