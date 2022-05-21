import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'


const OrderManageBook = Loadable(lazy(() => import('./OrderManage/OrderManageBook')))
const OrderRestoreBook = Loadable(lazy(() => import('./OrderManage/OrderRestoreBook')))
const OrderManageCourse = Loadable(lazy(() => import('./OrderManage/OrderManageCourse')))
const OrderRestoreCourse = Loadable(lazy(() => import('./OrderManage/OrderRestoreCourse')))

const OrdersRoutes = [
    {
        path: '/orderbook/manage',
        element: <OrderManageBook />,
    },
    {
        path: '/orderbook/restore',
        element: <OrderRestoreBook />,
    },
    {
        path: '/ordercourse/manage',
        element: <OrderManageCourse />,
    },
    {
        path: '/ordercourse/restore',
        element: <OrderRestoreCourse />,
    },
]

export default OrdersRoutes
