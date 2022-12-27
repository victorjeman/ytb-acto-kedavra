import styled from 'styled-components/macro'
import { TfiFaceSad } from 'react-icons/tfi'

import { SIZE } from 'constants/size.constants'

import { Button, StyledButton } from 'components/button/button'

export const CallToAction = () => {
	return (
		<StyledCallToAction>
			<StyledSadFace />
			<StyledText>There are no actors here. Consider adding one.</StyledText>

			<Button onClick={() => {}} size={SIZE.XL3}>
				Add new actor
			</Button>
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

const StyledSadFace = styled(TfiFaceSad)`
	margin-bottom: 1rem;
	font-size: 10rem;
`

const StyledText = styled.p`
	margin-bottom: 1.5rem;
`
