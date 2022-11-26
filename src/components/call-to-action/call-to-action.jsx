import styled from 'styled-components/macro'

import { SIZE } from 'constants/size.constants'

import { Button, StyledButton } from 'components/button/button'
import { ReactComponent as IconSadFace } from 'assets/icons/sad-face.svg'

export const CallToAction = () => {
	return (
		<StyledCallToAction>
			<StyledSadFace />
			<StyledText>There are no actors here. Consider adding one.</StyledText>

			<Button size={SIZE.XL3}>Add new actor</Button>
		</StyledCallToAction>
	)
}

const StyledCallToAction = styled.div`
	max-width: 20rem;
	height: 70vh;
	margin-right: auto;
	margin-left: auto;
	text-align: center;
	font-weight: 300;
	font-size: var(--font-size-xl2);
	line-height: var(--line-height-xl4);

	${StyledButton} {
		font-size: 1rem;
	}
`

const StyledSadFace = styled(IconSadFace)`
	margin-bottom: 1rem;
`

const StyledText = styled.p`
	margin-bottom: 1.5rem;
`
