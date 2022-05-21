import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import ProductsRoutes from 'app/views/products/ProductsRoutes'
import UsersRoutes from 'app/views/users/UsersRoutes'
import OrdersRoutes from 'app/views/orders/OrdersRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import { Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <PrivateRoute>
                    <AdminLayout />
                </PrivateRoute>
            ),
            children: [...dashboardRoutes,...ProductsRoutes, ...UsersRoutes,...chartsRoute, ...materialRoutes, ...OrdersRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
