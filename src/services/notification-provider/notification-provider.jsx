import { createContext, useContext, useReducer } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

import { Notifications } from 'components/notifications/notifications'
import { NOTIFICATION_ACTION_TYPE } from 'constants/general.constants'

const NotificationContext = createContext()

const NotificationProvider = (props) => {
	const [notifications, dispatch] = useReducer((notifications, action) => {
		switch (action.type) {
			case NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION:
				return [...notifications, { ...action.payload }]

			case NOTIFICATION_ACTION_TYPE.REMOVE_NOTIFICATION:
				return notifications.filter((el) => el.id !== action.id)

			default:
				return notifications
		}
	}, [])

	return (
		<NotificationContext.Provider value={dispatch}>
			<StyledNotificationsContainer>
				<Notifications notifications={notifications} dispatch={dispatch} />
			</StyledNotificationsContainer>
			{props.children}
		</NotificationContext.Provider>
	)
}

const StyledNotificationsContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
`

export const useNotification = () => {
	const dispatch = useContext(NotificationContext)

	return (props) => {
		const notification = {
			type: props.actionType,
			payload: {
				id: nanoid(),
				message: props.message,
				type: props.type,
				...props,
			},
		}

		if (props.actionType === NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION) {
			window.setTimeout(() => {
				dispatch({
					type: NOTIFICATION_ACTION_TYPE.REMOVE_NOTIFICATION,
					id: notification.payload.id,
				})
			}, 1200)
		}

		dispatch(notification)
	}
}

export default NotificationProvider
