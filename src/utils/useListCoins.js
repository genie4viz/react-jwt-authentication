import { useState, useEffect } from 'react';
import config from 'config';
import axios from 'axios';
import { authHeader, authRefresh } from '../utils';

export const useListCoins = default_flag => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const url = `${config.apiUrl}/get_assets?default=${default_flag}`;    
    axios({
      url: url,
      headers: authHeader()
    })
      .then(response => {
        const formatted = response.data.map(coin => {
          const link = 'https://cryptocompare.com' + coin.img_url;
          delete coin.img_url;
          return {
            ...coin,
            img_url: link
          };
        });
        setCoins(formatted);        
      })
      .catch(err => {
        authRefresh(url);
      });
  }, []);

  return coins;
};
