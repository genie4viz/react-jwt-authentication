import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './components/HomePage'
import SignIn from './components/SignIn'
import CryptoAssets from './components/CryptoAssets'
import Exchanges from './components/Exchanges'
import StableCoins from './components/StableCoins'
import LbitCoins from './components/LbitCoins'
import Comparison from './components/Comparison'
import Dictionary from './components/Dictionary'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

import { isUserAuthenticated } from './modules/Auth'

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/login' component={SignIn} />
      <Route path='/forgot-password' component={ForgotPassword} />
      <Route path='/reset-password' component={ResetPassword} />
      <Route path='/' 
        render={(renderProps) => (            
          isUserAuthenticated () 
            ? <HomePage renderProps={renderProps}>
                <div>
                  <Switch>
                    <Route path='/markets_cryptoassets' component={CryptoAssets} />
                    <Route path='/markets_exchanges' component={Exchanges} />
                    <Route path='/markets_stablecoins' component={StableCoins} />
                    <Route path='/markets_lbitcoins' component={LbitCoins} />
                    <Route path='/labs_comparison' component={Comparison} />
                    <Route path='/dictionary' component={Dictionary} />
                    <Redirect to='/markets_cryptoassets' />
                  </Switch>
                </div>
              </HomePage>
            : <Redirect to='/login' />
        )}
      />      
    </Switch>
  </Router>
)

export default Routes
