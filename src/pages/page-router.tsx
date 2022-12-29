import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import { PageHeader } from '~/common/components/page-header/page-header'
import { PageFooter } from '~/common/components/page-footer/page-footer'

import { StyleGuidePage } from 'pages/style-guide.page'
import { ActorsPage } from 'pages/actors.page'
import { ActorsWithMobxPage } from '~/pages/actors-mobx.page'
import { ActorsWithReduxPage } from '~/pages/actors-redux.page'

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
					<Route path='actors-mobx' element={<ActorsWithMobxPage />} />
					<Route path='actors-redux' element={<ActorsWithReduxPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
