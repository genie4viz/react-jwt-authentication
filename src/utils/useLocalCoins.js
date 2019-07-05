import { useState, useEffect } from 'react'
import config from 'config'
import { authHeader, authRefresh } from '../helpers'

export const useLocalCoins = () => {
	const [coins, setCoins] = useState([])

	useEffect(() => {
    const uri = `${config.apiUrl}/get_localbitcoin`
    const options = {
	    method: 'GET',
	    headers: authHeader()
	  }
		fetch(uri, options).then(response => {
	  	if(response.ok) return response.json()
	  	else authRefresh({ uri: uri, opts: options })
	  }).then(data => {
		  if(data.error) return
	    const formatted = data.map(c => {
	      const link = c.lb_img_url
	      delete c.img_url
	      return {
	        ...c,
	        img_url: link
	      }
	    })
	    setCoins(formatted)
	  })
	}, [])

  return coins
}
