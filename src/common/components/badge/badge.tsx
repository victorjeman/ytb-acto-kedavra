import styled, { css } from 'styled-components/macro'

import { BadgeType, Size } from '~/features/actors/models/actor.models'

interface Props {
	children: JSX.Element | string
	type?: BadgeType
	size?: Size
}

interface IBadge {
	$type: BadgeType
	$size: Size
}

export const Badge = ({ children, type = 'primary', size = 'base' }: Props) => {
	return (
		<StyledBadge $type={type} $size={size}>
			{children}
		</StyledBadge>
	)
}

export const StyledBadge = styled.span<IBadge>`
	${({ $type }: { $type: BadgeType }) =>
		css`
			color: var(--badge-color-${$type});
			background-color: var(--badge-bg-${$type});
		`};

	padding: ${({ $size }) => `calc(var(--padding-${$size}) / 2) var(--padding-${$size})`};
	border-radius: ${({ $size }) => `var(--border-radius-${$size})`};

	display: inline-block;
	line-height: 1.1;
	white-space: nowrap;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
`
