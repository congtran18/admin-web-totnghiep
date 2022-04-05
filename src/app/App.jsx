import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { AdminTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <Provider store={Store}>
            <SettingsProvider>
                <AdminTheme>
                    <AuthProvider>{all_pages}</AuthProvider>
                </AdminTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
