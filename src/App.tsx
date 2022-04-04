import React, {useEffect, lazy, Suspense } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from './styled/theme'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import axios from 'axios'

const Components: TODO = {
	LazyDashboard: lazy(() => import('./views/dashboard')),
	LazyView2: lazy(() => import('./views/view2')),
	LazyLoginView: lazy(() => import('./views/auth/Login4')),
}

// INCASE YOU DONT WANT TO MESS AROUND WITH CHECKING AUTH
const checkAuth2 = () => {return true}

// might need different types of loading later.
const skeletonMap: TODO = {
	LazyDashboard: <LoadingSpinner />,
	LazyView2: <LoadingSpinner />,
	LazyLoginView: <LoadingSpinner />,
}

const LazyComponent = ({ component, ...props }: TODO) => {
	// const isAuthenticated = checkAuth()
	const isAuthenticated = checkAuth2()
	const View = Components?.[component] || Components['LazyDashboard']
	return (
		<Suspense
			// fallback={skeletonMap[component]}
			fallback={<LoadingSpinner />}
		>
			{isAuthenticated || component === 'LazyLoginView' ? (
				<View {...props} />
			) : (
				<Navigate to='/login' replace />
			)}
		</Suspense>
	)
}

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const handler = (e: any) => {
        e.preventDefault()
        localStorage.removeItem('currentPageLead')
		localStorage.removeItem('pageSizeLead')
        e.returnValue = false
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handler)
        return () => window.removeEventListener('beforeunload', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
	return (
		<>
			<StyleSheetManager disableVendorPrefixes>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Routes>
						{/* <Route
							path='/dashboard'
							element={<LazyComponent component={'LazyDashboard'} />}
						/> */}
						<Route
							path='/route2'
							element={<LazyComponent component={'LazyView2'} />}
						/>
						<Route
							path='/login'
							element={
								<LazyComponent component={'LazyLoginView'} />
							}
						/>
						<Route
							path='/*'
							element={
								<LazyComponent component={'LazyDashboard'} />
							}
						/>
					</Routes>
				</ThemeProvider>
			</StyleSheetManager>
		</>
	)
}

export default App
