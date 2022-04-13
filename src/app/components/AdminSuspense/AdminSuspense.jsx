import React, { Suspense } from 'react'
import { AdminLoading } from 'app/components'

const AdminSuspense = ({ children }) => {
    return <Suspense fallback={<AdminLoading />}>{children}</Suspense>
}

export default AdminSuspense
