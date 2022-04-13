import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'


const ProductManage = Loadable(lazy(() => import('./ProductManage/ProductManage')))

const ProductsRoutes = [
    {
        path: '/products/manage',
        element: <ProductManage />,
    },
]

export default ProductsRoutes
