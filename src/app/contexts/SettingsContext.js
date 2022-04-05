import React, { createContext, useState } from 'react'

import { merge } from 'lodash'

import { AdminLayoutSettings } from 'app/components/AdminLayout/settings'

const SettingsContext = createContext({
    settings: AdminLayoutSettings,
    updateSettings: () => {},
})

export const SettingsProvider = ({ settings, children }) => {
    const [currentSettings, setCurrentSettings] = useState(
        settings || AdminLayoutSettings
    )

    const handleUpdateSettings = (update = {}) => {
        const marged = merge({}, currentSettings, update)
        setCurrentSettings(marged)
    }

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext
