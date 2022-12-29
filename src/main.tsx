import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app'
import NotificationProvider from 'services/notification-provider/notification-provider'
import { store } from 'store-redux/store'

import { GlobalCSSSizeVariables } from 'styles/global-css-size-variables'
import { GlobalCSSElements } from 'styles/global-css-elements'

import 'virtual:fonts.css'
import 'the-new-css-reset/css/reset.css'
import 'styles/variables.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GlobalCSSSizeVariables />
		<GlobalCSSElements />

		<Provider store={store}>
			<NotificationProvider>
				<App />
			</NotificationProvider>
		</Provider>
	</React.StrictMode>,
)
