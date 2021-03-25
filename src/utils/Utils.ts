export const capitalize = (value: string | null | undefined) => {
    if (value === null || value === undefined) {
        return ""
    }
    return value[0].toUpperCase() + value.slice(1)
}
