import styled, { css } from 'styled-components/macro'

import { BUTTON_TYPE, ICON_POSITION, SIZE } from 'components/constants/constants'

export const Button = ({
	type = BUTTON_TYPE.PRIMARY,
	size = SIZE.BASE,
	iconPosition = ICON_POSITION.LEFT,
	fullWidth = false,
	icon,
	onClick,
	children,
	...rest
}) => {
	const showIconLeft = icon && iconPosition === ICON_POSITION.LEFT
	const showIconRight = icon && iconPosition === ICON_POSITION.RIGHT

	return (
		<StyledButton
			$size={size}
			$type={type}
			$iconPosition={iconPosition}
			onClick={onClick}
			{...rest}>
			{showIconLeft && icon}

			{children && <StyledText>{children}</StyledText>}

			{showIconRight && icon}
		</StyledButton>
	)
}

const StyledButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	line-height: 1.1;

	${({ $size }) => css`
		font-size: var(--font-size-${$size});
	`}

	${({ $size, $type }) =>
		$type !== BUTTON_TYPE.CIRCLE &&
		css`
			border-radius: var(--border-radius-${$size});
			padding-right: var(--padding-${$size});
			padding-left: var(--padding-${$size});
			padding-top: calc(var(--padding-${$size}) / 2);
			padding-bottom: calc(var(--padding-${$size}) / 2);
		`}
	

	${({ $type }) =>
		$type === BUTTON_TYPE.PRIMARY &&
		css`
			background-color: var(--color-primary);
			color: var(--color-white-1);

			&:hover:not([disabled]) {
				background-color: var(--color-primary-dark);
			}
		`};

	${({ $type }) =>
		$type === BUTTON_TYPE.SECONDARY &&
		css`
			background-color: var(--color-white-2);
			color: var(--color-black-1);
			border: 2px solid var(--color-primary);

			&:hover:not([disabled]) {
				color: var(--color-primary);
				background-color: var(--color-gray-2);
			}
		`};

	${({ $type }) =>
		$type === BUTTON_TYPE.HELP &&
		css`
			background-color: var(--color-help);
			color: var(--color-black-1);
			border: 2px solid var(--color-primary);

			&:hover:not([disabled]) {
				background-color: var(--color-help-dark);
			}
		`};

	${({ $type, $size }) =>
		$type === BUTTON_TYPE.CIRCLE &&
		css`
			width: calc(2 * var(--font-size-${$size}));
			height: calc(2 * var(--font-size-${$size}));
			color: var(--color-gray-3);
			background-color: var(--color-white-1);
			border-radius: 50%;
			padding: 0;
			justify-content: center;
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

			&:hover:not([disabled]) {
				background-color: var(--color-gray-2);
			}
		`};

	&:disabled {
		opacity: 0.3;
		cursor: default;
	}

	&:focus:not(:hover) {
		border-color: var(--color-focus);
		color: var(--color-black-1);
		background-color: var(--color-focus);
		box-shadow: 0 2px 0 var(--color-black-1);
	}

	svg {
		display: inline-block;

		${({ $iconPosition, $type }) =>
			$iconPosition === ICON_POSITION.LEFT &&
			$type !== BUTTON_TYPE.CIRCLE &&
			css`
				margin-right: 0.3rem;
			`}

		${({ $iconPosition, $type }) =>
			$iconPosition === ICON_POSITION.RIGHT &&
			$type !== BUTTON_TYPE.CIRCLE &&
			css`
				margin-left: 0.3rem;
			`}
	}
`

const StyledText = styled.span`
	display: inline-block;
	vertical-align: middle;
`
