import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'

import { AppProvider } from './contexts/AppContext'

ReactDOM.render(
    <AppProvider>
        <Routes />
    </AppProvider> 
    , document.getElementById('app'));
