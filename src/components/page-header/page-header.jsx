import styled from 'styled-components'

import { text } from 'styles/mixins'
import { Logo } from 'components/logo/logo'

export const PageHeader = () => {
	return (
		<StyledHeader>
			<Logo />
		</StyledHeader>
	)
}

export const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	padding: var(--padding-xl);
	background-color: var(--color-white-1);
	filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.1));
`

export const StyledLogo = styled.a`
	font-weight: 700;
	${text({ size: 'md' })}
`
