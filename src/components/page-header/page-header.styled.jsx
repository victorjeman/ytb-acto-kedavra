import styled from 'styled-components/macro'
import { text } from 'styles/mixins'

export const Header = styled.header`
	display: flex;
	justify-content: center;
	padding: 20px;
	background-color: var(--color-white-1);
	filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.1));
`

export const Logo = styled.a`
	font-weight: 700;
	${text({ size: 'md' })}
`
