import React from 'react'
import { AdminLayouts } from './index'
import { AdminSuspense } from 'app/components'
import useSettings from 'app/hooks/useSettings'

const AdminLayout = (props) => {
    const { settings } = useSettings()
    const Layout = AdminLayouts[settings.activeLayout]

    return (
        <AdminSuspense>
            <Layout {...props} />
        </AdminSuspense>
    )
}

export default AdminLayout
