import { type Dispatch, type SetStateAction, useCallback, useState } from "react"

export function useToggle(defaultValue = false): [
    value: boolean, toggle: VoidFunction, setValue: Dispatch<SetStateAction<boolean>>
] {
    const [value, setValue] = useState(defaultValue)
    const toggle = useCallback(function () {
        setValue(function (prevState) {
            return !prevState
        })
    }, [setValue])

    return [value, toggle, setValue]
}
