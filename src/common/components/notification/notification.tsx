import { MdDone } from 'react-icons/md'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import styled, { css } from 'styled-components/macro'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from '~/common/constants/general.constants'
import { SIZE } from '~/common/constants/size.constants'
import { NotificationType, Size } from '~/features/actors/models/actor.models'

const NOTIFICATION_ICON = {
	[NOTIFICATION_TYPE.SUCCESS]: <MdDone />,
	[NOTIFICATION_TYPE.WARNING]: <AiOutlineQuestionCircle />,
	[NOTIFICATION_TYPE.DANGER]: <AiOutlineExclamationCircle />,
}

interface Props {
	type?: NotificationType
	size?: Size
	id: string
	message: string
	dispatch: ({ type, id }: { type: NotificationType; id: string }) => void
}

export const Notification = ({
	type = NOTIFICATION_TYPE.SUCCESS,
	size = SIZE.BASE,
	id,
	message,
	dispatch,
}: Props) => {
	const removeNotification = () => {
		dispatch({
			type: NOTIFICATION_ACTION_TYPE.REMOVE_NOTIFICATION,
			id,
		})
	}

	return (
		<StyledNotification $size={size} $type={type}>
			{NOTIFICATION_ICON[type]}

			<StyleText>{message}</StyleText>

			<StyledButton $size={size} onClick={removeNotification}>
				<GrClose />
			</StyledButton>
		</StyledNotification>
	)
}

interface StyledNotificationInterface {
	$size: Size
	$type: NotificationType
}

const StyledNotification = styled.div<StyledNotificationInterface>`
	position: relative;
	display: flex;
	align-items: center;

	padding: ${({ $size }) => `calc(var(--padding-${$size})) var(--padding-${$size})`};
	border-radius: ${({ $size }) => `var(--border-radius-${$size})`};

	${({ $type }) =>
		css`
			color: var(--notification-color-${$type});
			background-color: var(--notification-bg-${$type});
		`};
`

const StyleText = styled.p`
	padding-right: 1rem;
	padding-left: 1rem;
`

const StyledButton = styled.button`
	cursor: pointer;
	line-height: 1;
	position: absolute;
	top: 0;
	right: ${({ $size }: { $size: Size }) => `var(--padding-${$size})`};
	bottom: 0;
	left: auto;
	margin: auto;
`
