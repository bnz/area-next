export function getAdminStorage() {
    let parsed: any = {}
    try {
        const storage = localStorage.getItem("admin")
        if (storage !== null) {
            parsed = JSON.parse(storage)
        }
    } catch (e) {
        console.log(e)
    }
    return parsed
}

export function saveAdminStore(newStore: any): void {
    localStorage.setItem("admin", JSON.stringify(newStore))
}
