import styled from 'styled-components/macro'

export const Logo = () => {
	return <StyledLogo href='/'>ActoKedavra</StyledLogo>
}

const StyledLogo = styled.a`
	color: var(---color-black-1);
	font-weight: 700;
`
