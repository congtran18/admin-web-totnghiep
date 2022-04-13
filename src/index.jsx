import React from 'react'
import App from './app/App'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import * as serviceWorker from './serviceWorker'
import { store } from 'app/features/store'
import { StyledEngineProvider } from '@mui/styled-engine'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { SettingsProvider } from 'app/contexts/SettingsContext'

ReactDOM.render(
    <Provider store={store}>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <CssBaseline />
                <SettingsProvider>
                    <App />
                </SettingsProvider>
            </BrowserRouter>
        </StyledEngineProvider>
    </Provider>,
    document.getElementById('root')
)

// for IE-11 support un-comment cssVars() and it's import in this file
// and in AdminTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
