import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'


const TutorManage = Loadable(lazy(() => import('./TutorManage/TutorManage')))
const TutorRegister = Loadable(lazy(() => import('./TutorManage/TutorRegister')))
const TutorUpdate = Loadable(lazy(() => import('./TutorManage/TutorUpdate')))

const UsersRoutes = [
    {
        path: '/tutors/manage',
        element: <TutorManage />,
    },
    {
        path: '/updatetutor/:tutorid',
        element: <TutorUpdate />,
    },
    {
        path: '/tutors/register',
        element: <TutorRegister />,
    },
]

export default UsersRoutes
