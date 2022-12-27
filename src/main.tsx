import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

import 'the-new-css-reset/css/reset.css'
import 'styles/variables.css'

import { GlobalCSSSizeVariables } from 'styles/global-css-size-variables'
import { GlobalCSSElements } from 'styles/global-css-elements'

import NotificationProvider from 'services/notification-provider/notification-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GlobalCSSSizeVariables />
		<GlobalCSSElements />
		<NotificationProvider>
			<App />
		</NotificationProvider>
	</React.StrictMode>,
)
