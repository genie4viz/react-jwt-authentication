import { useState, useEffect } from 'react';
import config from 'config';
import { authHeader, authRefresh } from '../_helpers';

export const useStableCoins = () => {
	const [coins, setCoins] = useState([]);

	useEffect(() => {
		const uri = `${config.apiUrl}/get_stablecoin`;
		const options = {
			method: 'GET',
			headers: authHeader()
		};
		fetch(uri, options).then(response => {
			if (response.ok) return response.json();
			else authRefresh({ uri: uri, opts: options });
		}).then(data => {
			console.log(data);
			if (data.error) return;
			const formatted = data.map(c => {
				const link = 'https://cryptocompare.com' + c.stc_img_url;
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
