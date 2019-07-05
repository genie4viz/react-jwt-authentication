

export const authenticateUser = user => {
    localStorage.setItem('user', user)
}

export const isUserAuthenticated = () => localStorage.getItem('user') !== null

export const deauthenticateUser = () => {
    localStorage.removeItem('user')
}

export const getToken = () => localStorage.getItem('token')