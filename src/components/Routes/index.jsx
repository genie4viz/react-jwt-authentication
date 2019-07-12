import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {HomePage, CryptoAssets, Exchanges, StableCoins, LbitCoins, Comparison, Dictionary } from '../AppPages';
import { SignIn, ForgotPassword, ResetPassword } from '../UserManagement';

import { setReceivedToken, getReceivedToken } from '../../utils';
import favicon from '../../static/fav.png';


const changeFavicon = src => {
  let link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.type = 'image/png/ico';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
};

const Routes = () => {
  const [_, setStateReceived] = useState('unused');
  const receivedToken = new URLSearchParams(location.search).get('token');  
  setReceivedToken(receivedToken && receivedToken !== 'unused' ? receivedToken : 'unused');  
  useEffect(() => {
    setStateReceived(receivedToken);
  }, [receivedToken])
  
  
  changeFavicon(favicon);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        {getReceivedToken() !== 'unused' && <Redirect to="/reset-password" />}
        <Route
          path="/"
          render={renderProps =>
            <HomePage renderProps={renderProps}>
              <div>
                <Switch>
                  <Route path="/markets_cryptoassets" component={CryptoAssets} />
                  <Route path="/markets_exchanges" component={Exchanges} />
                  <Route path="/markets_stablecoins" component={StableCoins} />
                  <Route path="/markets_lbitcoins" component={LbitCoins} />
                  <Route path="/labs_comparison" component={Comparison} />
                  <Route path="/dictionary" component={Dictionary} />
                  <Redirect to="/markets_cryptoassets" />
                </Switch>
              </div>
            </HomePage>            
          }
        />
      </Switch>
    </Router>
  );
};
export default Routes;
