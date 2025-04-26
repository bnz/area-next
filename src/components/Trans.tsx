import { useEffect } from "react"
import { useAdmin } from "@/components/AdminProvider"

export function Trans() {

    const { loadFile } = useAdmin()

    useEffect(function () {
        (async function () {
            // await loadFile()
        })()
    }, [loadFile])

    return (
        <>Trans</>
    )
}
