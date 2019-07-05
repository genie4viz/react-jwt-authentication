import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import CryptoAssets from './components/CryptoAssets'

import { isUserAuthenticated } from './modules/Auth';

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/'
        render={(renderProps) => (
          <div>
            { isUserAuthenticated() 
              ? <HomePage />
              : <LoginForm />
            }
          </div>
        )}
      />      
    </Switch>
  </Router>
)

export default Routes;
