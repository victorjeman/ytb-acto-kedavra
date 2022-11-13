import styled, { css } from 'styled-components/macro'

import { BUTTON_TYPE, ICON_POSITION } from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

export const Button = ({
	type = BUTTON_TYPE.PRIMARY,
	size = SIZE.BASE,
	iconPosition = ICON_POSITION.LEFT,
	isFullWidth = false,
	icon,
	onClick,
	children,
	...rest
}) => {
	const showIconLeft = icon && iconPosition === ICON_POSITION.LEFT
	const showIconRight = icon && iconPosition === ICON_POSITION.RIGHT
	const isCircle = type === BUTTON_TYPE.CIRCLE
	const isText = type === BUTTON_TYPE.TEXT
	const shouldHavePadding = !isCircle

	return (
		<StyledButton
			$size={size}
			$type={type}
			$isCircle={isCircle}
			$isText={isText}
			$shouldHavePadding={shouldHavePadding}
			$showIconLeft={showIconLeft}
			$showIconRight={showIconRight}
			$isFullWidth={isFullWidth}
			onClick={onClick}
			{...rest}>
			{showIconLeft && icon}

			{children && children}

			{showIconRight && icon}
		</StyledButton>
	)
}

export const StyledButton = styled.button`
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	line-height: 1.1;

	&:disabled {
		opacity: 0.3;
		cursor: default;
	}

	&:focus:not(:hover) {
		border-color: var(--color-focus);
		color: var(--color-black-1);
		background-color: var(--color-focus);
		box-shadow: 1px 2px 0 var(--color-black-1);
	}

	${({ $shouldHavePadding, $size }) =>
		$shouldHavePadding &&
		css`
			padding: calc(var(--padding-${$size}) / 2) var(--padding-${$size})
				calc(var(--padding-${$size}) / 2) var(--padding-${$size});
		`};

	${({ $size, $type, $isText }) =>
		!$isText &&
		css`
			border-radius: var(--border-radius-${$size});
			font-size: var(--font-size-${$size});

			background-color: var(--btn-bg-color-${$type});
			border: 2px solid var(--btn-border-color-${$type});
			color: var(--btn-color-${$type});

			&:hover:not([disabled]) {
				background-color: var(--btn-bg-color-hover-${$type});
				border-color: var(--btn-border-color-hover-${$type});
				color: var(--btn-color-hover-${$type});
			}
		`};

	${({ $isCircle, $size }) =>
		$isCircle &&
		css`
			padding: 0;
			border-radius: 50%;
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
			width: calc(2 * var(--font-size-${$size}));
			height: calc(2 * var(--font-size-${$size}));
		`};

	${({ $isText, $size }) =>
		$isText &&
		css`
			color: var(--color-help-dark);
			border-radius: var(--border-radius-${$size});

			&:hover:not([disabled]) {
				background-color: var(--color-gray-2);
			}
		`}

	svg {
		${({ $showIconLeft, $isCircle }) => $showIconLeft && !$isCircle && 'margin-right: 0.3rem'};
		${({ $showIconRight, $isCircle }) => $showIconRight && !$isCircle && 'margin-left: 0.3rem'};
	}

	${({ $isFullWidth }) => $isFullWidth && 'width: 100%'};
`
