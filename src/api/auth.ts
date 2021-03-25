export const checkUserAuth = () => sessionStorage.getItem("userId") !== null

export const userHeader = () => sessionStorage.getItem("userId")

export const userLogout = () => sessionStorage.clear()

export const userAuth = (userId: string) => {
    sessionStorage.setItem("userId", userId)
}
