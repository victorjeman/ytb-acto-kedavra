import React from 'react'
import ReactDOM from 'react-dom/client'
import 'the-new-css-reset/css/reset.css'

import App from './app'

import 'styles/variables.css'

import { GlobalCSSSizeVariables } from 'styles/global-css-size-variables'
import { GlobalCSSElements } from 'styles/global-css-elements'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<GlobalCSSSizeVariables />
		<GlobalCSSElements />
		<App />
	</React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
