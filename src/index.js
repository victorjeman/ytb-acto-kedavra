import React from 'react'
import ReactDOM from 'react-dom/client'
import 'the-new-css-reset/css/reset.css'

import './styles/elements.css'
import './styles/variables.css'

import './assets/fonts/icomoon.ttf'

import App from './app'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
