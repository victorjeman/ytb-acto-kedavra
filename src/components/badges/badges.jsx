import styled from 'styled-components/macro'

import { Badge } from 'components/badge/badge'

export const Badges = ({ badges, className }) => {
	return (
		<StyledBadges className={className}>
			{badges.map((badge) => (
				<StyledBadgesItem key={badge.key}>
					<Badge type={badge.type} size={badge.size}>
						{badge.text}
					</Badge>
				</StyledBadgesItem>
			))}
		</StyledBadges>
	)
}

export const StyledBadges = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
`

const StyledBadgesItem = styled.li`
	padding: 0;
	margin-right: 0.6rem;
	margin-bottom: 0.6rem;
	display: inline-block;
	line-height: 0;
`
