import styled from 'styled-components/macro'

import { Notification } from 'components/notification/notification'

export const Notifications = ({ notifications = [], dispatch }) => {
	return (
		<>
			{notifications.map((notification) => (
				<StyledNotificationWrapper key={notification.id}>
					<Notification
						type={notification.type}
						message={notification.message}
						id={notification.id}
						dispatch={dispatch}
					/>
				</StyledNotificationWrapper>
			))}
		</>
	)
}

const StyledNotificationWrapper = styled.div`
	margin-bottom: 1rem;
`
