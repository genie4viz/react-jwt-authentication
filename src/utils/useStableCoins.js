import { useState, useEffect } from 'react';
import config from 'config';
import axios from 'axios';
import { authHeader, authRefresh } from '../utils';

export const useStableCoins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const url = `${config.apiUrl}/get_stablecoin`;    
    axios({
      url: url, 
      headers: authHeader()
    })
      .then(response => {
        const formatted = response.data.map(coin => {
          const link = 'https://cryptocompare.com' + coin.stc_img_url;
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
