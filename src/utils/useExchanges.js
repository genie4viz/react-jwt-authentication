import { useState, useEffect } from 'react';
import config from 'config';
import { authHeader, authRefresh } from '../_helpers';

export const useExchanges = () => {
	const [coins, setCoins] = useState([]);

	useEffect(() => {
    const uri = `${config.apiUrl}/get_exchanges`;
    const options = {
	    method: 'GET',
	    headers: authHeader()
	  };
		fetch(uri, options).then(response => {
	  	if(response.ok) return response.json();
	  	else return authRefresh({ uri: uri, opts: options });
	  }).then(data => {
          console.log(data);
		if(data.error) return;
	    const formatted = data.map(c => {
	      const link = 'https://cryptocompare.com' + c.exch_logo_url;
	      delete c.img_url;
	      return {
	        ...c,
	        img_url: link
	      };
	    });
	    setCoins(formatted);
	  });
	}, []);

  return coins;
};
