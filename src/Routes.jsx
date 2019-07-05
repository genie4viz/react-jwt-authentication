import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import CryptoAssets from './components/CryptoAssets'
import Exchanges from './components/Exchanges'

import { isUserAuthenticated } from './modules/Auth'

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/login' component={LoginForm} />
      <Route path='/'
        render={() => (
          <div>
            { isUserAuthenticated()
              ? <HomePage>                  
                  <div>
                    <Switch>                      
                      <Route path='/cryptoassets' component={CryptoAssets} />
                      <Route path='/exchanges' component={Exchanges} />
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
