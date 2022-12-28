import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import { PageHeader } from 'components/page-header/page-header'
import { PageFooter } from 'components/page-footer/page-footer'

import { StyleGuidePage } from 'pages/style-guide.page'
import { ActorsPage } from 'pages/actors.page'

function Layout() {
	return (
		<>
			<PageHeader />
			<Outlet />
			<PageFooter />
		</>
	)
}

export const PageRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='style-guide' element={<StyleGuidePage />} />
					<Route path='actors' element={<ActorsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
