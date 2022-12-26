import { MdDone } from 'react-icons/md'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import styled, { css } from 'styled-components/macro'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

const NOTIFICATION_ICON = {
	[NOTIFICATION_TYPE.SUCCESS]: <MdDone />,
	[NOTIFICATION_TYPE.WARNING]: <AiOutlineQuestionCircle />,
	[NOTIFICATION_TYPE.DANGER]: <AiOutlineExclamationCircle />,
}

export const Notification = ({
	type = NOTIFICATION_TYPE.SUCCESS,
	size = SIZE.BASE,
	id,
	message,
	dispatch,
}) => {
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

const StyledNotification = styled.div`
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
	right: ${({ $size }) => `var(--padding-${$size})`};
	bottom: 0;
	left: auto;
	margin: auto;
`
