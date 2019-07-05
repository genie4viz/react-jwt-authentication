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

import { isUserAuthenticated } from './modules/Auth'

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/login' component={SignIn} />
      <Route path='/'
        render={() => (
          <div>
            { isUserAuthenticated()
              ? <HomePage>                  
                  <div>
                    <Switch>                      
                      <Route path='/cryptoassets' component={CryptoAssets} />
                      <Route path='/exchanges' component={Exchanges} />
                      <Route path='/stablecoins' component={StableCoins} />
                      <Route path='/lbitcoins' component={LbitCoins} />
                      <Route path='/comparison' component={Comparison} />
                      <Route path='/dictionary' component={Dictionary} />
                      <Redirect to='/cryptoassets' />
                    </Switch>
                  </div>
                </HomePage>
              : <Redirect to='/login' />
            }
          </div>
        )}
      />      
    </Switch>
  </Router>
)

export default Routes
