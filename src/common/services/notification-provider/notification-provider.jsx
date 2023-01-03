import { createContext, useContext, useReducer } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

import { NOTIFICATION_ACTION_TYPE } from '~/common/constants/general.constants'
import { Notifications } from '~/common/components/notifications/notifications'

const REMOVE_TIME = 2500
const notificationContext = createContext()

function reducer(state, action) {
	switch (action.type) {
		case NOTIFICATION_ACTION_TYPE.ADD:
			return { notifications: [...state.notifications, { ...action.payload }] }

		case NOTIFICATION_ACTION_TYPE.REMOVE:
			return {
				notifications: state.notifications.filter(
					(notification) => notification.id !== action.payload.id,
				),
			}

		default:
			return state
	}
}

export const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, { notifications: [] })

	return (
		<notificationContext.Provider value={dispatch}>
			<StyledNotificationsContainer>
				<Notifications notifications={state.notifications} dispatch={dispatch} />
			</StyledNotificationsContainer>
			{children}
		</notificationContext.Provider>
	)
}

export const useNotificationDispatch = () => {
	const notificationDispatch = useContext(notificationContext)

	function removeNewlyAddedNotification(notification) {
		window.setTimeout(() => {
			notificationDispatch({
				payload: notification,
				type: NOTIFICATION_ACTION_TYPE.REMOVE,
			})
		}, REMOVE_TIME)
	}

	function notificationDispatchEnhanced({ type, payload }) {
		const notification = { ...payload, id: nanoid() }

		if (type === NOTIFICATION_ACTION_TYPE.ADD) removeNewlyAddedNotification(notification)

		notificationDispatch({ type: NOTIFICATION_ACTION_TYPE.ADD, payload: notification })
	}

	return notificationDispatchEnhanced
}

const StyledNotificationsContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
`
