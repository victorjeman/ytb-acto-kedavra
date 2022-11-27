import styled, { css } from 'styled-components/macro'

import { SIZE } from 'constants/size.constants'
import { BADGE_TYPE } from 'constants/general.constants'

export const Badge = ({ children, type = BADGE_TYPE.PRIMARY, size = SIZE.BASE }) => {
	return (
		<StyledBadge $type={type} $size={size}>
			{children}
		</StyledBadge>
	)
}

export const StyledBadge = styled.span`
	${({ $type }) =>
		css`
			color: var(--badge-color-${$type});
			background-color: var(--badge-bg-${$type});
		`};

	padding: ${({ $size }) => `calc(var(--padding-${$size}) / 2) var(--padding-${$size})`};
	border-radius: ${({ $size }) => `var(--border-radius-${$size})`};
	font-size: ${({ $size }) => `var(--font-size-${$size})`};

	display: inline-block;
	line-height: 1.1;
	white-space: nowrap;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
`
