import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app'
import { NotificationProvider } from '~/common/services/notification-provider/notification-provider'
import { reduxStore } from '~/common/store/redux.store'

import 'virtual:fonts.css'
import 'the-new-css-reset/css/reset.css'

import '~/common/styles/variables.css'
import { GlobalCSSSizeVariables } from '~/common/styles/global-css-size-variables'
import { GlobalCSSElements } from '~/common/styles/global-css-elements'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GlobalCSSSizeVariables />
		<GlobalCSSElements />

		<Provider store={reduxStore}>
			<NotificationProvider>
				<App />
			</NotificationProvider>
		</Provider>
	</React.StrictMode>,
)
