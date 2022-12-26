import styled from 'styled-components/macro'

import { StyledButton } from 'components/button/button'
import { ReadMore, StyledText } from 'components/read-more/read-more'

export const ActorReadMore = ({ text, limit, className }) => {
	return (
		<StyledActorReadMore className={className}>
			<ReadMore text={text} limit={limit} />
		</StyledActorReadMore>
	)
}

export const StyledActorReadMore = styled.div`
	${StyledText} {
		color: var(--color-gray-3);
	}

	${StyledButton} {
		color: var(--color-yellow);
		padding: 0;
		font-weight: 600;
	}
`
