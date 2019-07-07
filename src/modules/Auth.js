
import config from 'config';

export const authenticateUser = (userData, email) => {
    userData.email = email
    localStorage.setItem('user', JSON.stringify(userData))
}

export const isUserAuthenticated = () => {
    if(localStorage.getItem('user') === null)
        return false
    return true
    // const user = JSON.parse(localStorage.getItem("user"))
    // const refToken = user.refreshToken;
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('accept', 'application/json');        
    // fetch(`${config.apiUrl}/auth/refresh`, {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify({ token: refToken})
    // }).then(response => {
    //     console.log(response, 'response')
    //     if(response.ok) return response.json();
    //     return null;
    // }).then(data => {
    //     console.log(data, 'from server')
    //     if(!data) {
    //         // here we logout user
    //         return false;
    //     }
    //     localStorage.setItem('user', {
    //         ...user,
    //         refreshToken: data.refreshToken,
    //         accessToken: data.accessToken
    //     });
    //     return true;
    // });
}

export const deauthenticateUser = () => {
    localStorage.removeItem('user')
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("user"))
}
export const getToken = () => localStorage.getItem('token')

export const setReceivedToken = token => {
    localStorage.setItem('received_token', token)
}

export const getReceivedToken = () => {
    return localStorage.getItem('received_token')
}
export const removeReceivedToken = () => {    
    localStorage.setItem('received_token', 'unused')
}