import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'


const UserManage = Loadable(lazy(() => import('./UserManage/UserManage')))
const UserRestore = Loadable(lazy(() => import('./UserManage/UserRestore')))

const UsersRoutes = [
    {
        path: '/users/manage',
        element: <UserManage />,
    },
    {
        path: '/users/restore',
        element: <UserRestore />,
    },
]

export default UsersRoutes
