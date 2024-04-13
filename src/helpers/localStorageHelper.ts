export function getTokenFromLocaleStorage(): string {
    const data =  localStorage.getItem('token')
    const token: string = data ? JSON.parse(data) : '';

    return token;
}
export function setTokenToLocaleStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocaleStorage(key: string): void {
    localStorage.removeItem(key)
}