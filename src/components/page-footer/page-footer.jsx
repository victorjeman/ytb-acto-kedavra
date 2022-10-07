import styled from 'styled-components'
import dayjs from 'dayjs'

import { Logo } from 'components/logo/logo'
import { text } from 'styles/mixins'

const TODAY_STRING = dayjs().format('D MMMM YYYY')

export const PageFooter = () => {
	return (
		<StyledFooter>
			<StyledText>{TODAY_STRING}</StyledText>
			<Logo />
		</StyledFooter>
	)
}

const StyledFooter = styled.footer`
	padding: var(--padding-base);
	border-top: 1px solid var(--color-gray-1);
	background-color: var(--color-white-1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`

const StyledText = styled.p`
	${text({ size: 'sm' })}
`
