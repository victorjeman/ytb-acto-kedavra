import styled from 'styled-components/macro'

import { StyledButton } from '~/common/components/button/button'
import { ReadMore, StyledText } from '~/common/components/read-more/read-more'

interface Props {
	text: string
	limit?: number
	className?: string
}

export const ActorReadMore = ({ text, limit = 40, className }: Props) => {
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
