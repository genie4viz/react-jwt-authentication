import { useState, useEffect } from 'react';
import config from 'config';
import axios from 'axios';
import { authHeader, authRefresh } from '../utils';

export const useHeaders = () => {
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const url = `${config.apiUrl}/get_header`;    
    axios({
      url: url,
      headers: authHeader()
    })
    .then(response => {
      setHeaders(response.data);        
    })
    .catch(err => {
      authRefresh(url);
    });
  }, []);

  return headers;
};
