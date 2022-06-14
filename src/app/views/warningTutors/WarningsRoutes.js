import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const WarningManage = Loadable(lazy(() => import('./WarningManage/WarningManage')))
const WarningUpdate = Loadable(lazy(() => import('./WarningManage/WarningUpdate')))

const WarningsRoutes = [
    {
        path: '/warnings/manage',
        element: <WarningManage />,
    },
    {
        path: '/updatewarning/:warningid',
        element: <WarningUpdate />,
    },
]

export default WarningsRoutes
