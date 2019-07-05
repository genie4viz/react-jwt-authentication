import { useState, useEffect } from 'react'
import config from 'config'
import { authHeader, authRefresh } from '../helpers'

export const useHeaders = () => {
	const [headers, setHeaders] = useState([])

	useEffect(() => {
    const uri = `${config.apiUrl}/get_header`
    const options = {
	    method: 'GET',
	    headers: authHeader()
	  }
		fetch(uri, options).then(response => {
	  	if(response.ok) return response.json()
	  	else authRefresh({ uri: uri, opts: options })
	  }).then(data => {
		if(data.error) return
	    setHeaders(data)
	  })
	}, [])

  return headers
}
