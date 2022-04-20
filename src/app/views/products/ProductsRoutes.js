import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'


const ProductManage = Loadable(lazy(() => import('./ProductManage/ProductManage')))
const ProductRestore = Loadable(lazy(() => import('./ProductManage/ProductRestore')))

const ProductsRoutes = [
    {
        path: '/products/manage',
        element: <ProductManage />,
    },
    {
        path: '/products/restore',
        element: <ProductRestore />,
    },
]

export default ProductsRoutes
