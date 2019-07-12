import config from 'config'

import { authHeader } from '../helpers'

export function authRefresh(repeater) {
  const user = localStorage.getItem('user')
  const headers = new Headers()
  headers.append('authorization', `Bearer ${JSON.parse(user).refreshToken}`)
  headers.append('cache-control', 'no-cache')
  headers.append('Content-Type', 'application/json')
  return fetch(`${config.apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: headers
  }).then(response => response.json())
  .then(body => {
    if(body.message === 'Refresh Token expired') return { error: 401 }
    localStorage.setItem('user', JSON.stringify({
      ...JSON.parse(user),
      accessToken: body.accessToken,
      refreshToken: body.refreshToken
    }))
    return fetch(repeater.uri, {
      ...repeater.opts,
      headers: authHeader()
    }).then(response => response.json())
  }).catch(err => {    
    return { error: 500 }
  })
}
