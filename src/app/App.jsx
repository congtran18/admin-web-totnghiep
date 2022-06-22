import React, { lazy } from 'react'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { AdminTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loadable from 'app/components/Loadable/Loadable'
import AdminLayout from 'app/components/AdminLayout/AdminLayout'
import sessionRoutes from 'app/views/sessions/SessionRoutes'

const App = () => {

    const all_pages = useRoutes(AllPages())

    return (
        <>
            <AdminTheme>
                    {all_pages}
            </AdminTheme>
            <ToastContainer
                position='bottom-right'
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default App
