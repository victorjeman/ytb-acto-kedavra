import styled from 'styled-components/macro'

import { INotification, NotificationType } from '~/features/actors/models/actor.models'
import { Notification } from '~/common/components/notification/notification'

interface Props {
	notifications: INotification[]
	dispatch: ({ type, id }: { type: NotificationType; id: string }) => void
}

export const Notifications = ({ notifications = [], dispatch }: Props) => {
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
