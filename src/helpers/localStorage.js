export const localStorageSet = (key, data, isJson = false) => {
    localStorage.setItem(key, isJson ? JSON.stringify(data) : data)
}

export const localStorageGet = (key, isJson = false) => {
    return isJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
}

export const localStorageRemove = (key) => {
    localStorage.removeItem(key)
}

export const localStorageAllClear = () => {
    localStorage.clear()
}