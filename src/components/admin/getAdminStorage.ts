type StoreType = {
    active: boolean
    minimized: boolean
    tab: number
    position: "left" | "center" | "right"
}

export function getAdminStorage(): StoreType {
    let parsed = {} as StoreType
    try {
        const storage = localStorage.getItem("admin")
        if (storage !== null) {
            parsed = JSON.parse(storage) as StoreType
        }
    } catch (e) {
        console.log(e)
    }
    return parsed
}

export function saveAdminStore(storePart: Partial<StoreType>): void {
    const parsed = getAdminStorage()

    try {
        localStorage.setItem("admin", JSON.stringify({ ...parsed, ...storePart }))
    } catch (e) {
        console.log(e)
    }
}
