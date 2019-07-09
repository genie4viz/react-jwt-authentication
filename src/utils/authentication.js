import config from 'config'
import axios from 'axios'

const jwtDecode = require('jwt-decode')

export function authHeader () {  
  try {
    return {
      'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    };    
  } catch (err) {
    return null
  }
}
export function authRefresh (url) {
  const user = localStorage.getItem('user');
  return axios({
    method: 'post',
    url: `${config.apiUrl}/auth/refresh`, 
    headers: authHeader()
  })
  .then(response => {    
    if (response.message === 'Refresh Token expired') return { error: 401 }
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...JSON.parse(user),
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      })
    )
    return axios({
      method: 'post',
      url: url,
      headers: authHeader()
    }).then(response => response.data)
  })    
  .catch(err => {
    return { error: 500 }
  })
}

export const authenticateUser = (userData, email) => {
  userData.email = email
  localStorage.setItem('user', JSON.stringify(userData))
}

export const isUserAuthenticated = () => {
  const userInfo = localStorage.getItem('user');  
  if (userInfo === null) return false;
  try { 
    const { exp } = jwtDecode(JSON.parse(userInfo).accessToken);    
    if (Date.now() < exp * 1000){
      return true;
    }
  } catch (err) {    
    const user = JSON.parse(userInfo);    
    axios({
      url: `${config.apiUrl}/auth/refresh`,
      headers: {        
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      data: {
        token: user.refreshToken
      }
    })
      .then(response => {        
        localStorage.setItem('user', {
          ...user,
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken
        })
        return true;
      })
      .catch(err => {
        return false;        
      })
  }
}

export const deauthenticateUser = () => {
  localStorage.removeItem('user')
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user'))
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
