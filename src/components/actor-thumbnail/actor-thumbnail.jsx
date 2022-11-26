import { FiThumbsUp } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { MdOutlineModeEdit } from 'react-icons/md'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { BADGE_TYPE, ICON_POSITION, BUTTON_TYPE } from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

import { ActorReadMore, StyledActorReadMore } from 'components/actor-read-more/actor-read-more'
import { Badges, StyledBadges } from 'components/badges/badges'
import { Button } from 'components/button/button'

//? What is a pure function?
function generateBadgesFromHobbies(hobbies) {
	return hobbies.map((hobby) => ({
		type: BADGE_TYPE.PRIMARY,
		size: SIZE.XS,
		text: hobby,
		key: nanoid(), //? What is nanoid? DON'T generate dynamic keys inside JSX. Why?
	}))
}

export const ActorThumbnail = ({ actor, setMessage }) => {
	const { hobbies, image, firstName, lastName, job, score, description } = actor

	const [badges, setBadges] = useState([])

	//? DON'T call the function directly inside the component. Why?
	// const badges = generateBadgesFromHobbies(hobbies)

	//? DO call the function inside useEffect. Why?
	useEffect(() => {
		setBadges(generateBadgesFromHobbies(hobbies))
	}, [hobbies])
	return (
		<StyledActorThumbnail>
			<StyledImage src={image} alt={`${firstName} ${lastName}`} />

			<StyledContent>
				<StyledName>
					{firstName} {lastName}
				</StyledName>

				<StyledInfo>
					<StyledJob>{job}</StyledJob>

					<StyledScore>
						{score} <FiThumbsUp />
					</StyledScore>
				</StyledInfo>

				<Badges badges={badges} />

				<ActorReadMore text={description} limit={80} />

				<Button
					type={BUTTON_TYPE.SECONDARY}
					isFullWidth={true}
					icon={<MdOutlineModeEdit />}
					iconPosition={ICON_POSITION.RIGHT}
					onClick={() => setMessage(nanoid())}>
					Edit
				</Button>

				<StyledRemove>
					<Button type={BUTTON_TYPE.CIRCLE} icon={<GrClose />} />
				</StyledRemove>
			</StyledContent>
		</StyledActorThumbnail>
	)
}

const StyledActorThumbnail = styled.article`
	border-radius: var(--border-radius-base);
	background-color: var(--color-white-1);
	position: relative;

	${StyledBadges} {
		margin-bottom: 0.5rem;
	}

	${StyledActorReadMore} {
		margin-bottom: 0.5rem;
	}
`

const StyledContent = styled.div`
	padding: 0 1rem 1rem 1rem;
`

const StyledImage = styled.img`
	border-top-left-radius: var(--border-radius-base);
	border-top-right-radius: var(--border-radius-base);
	height: 220px;
	width: 100%;
	object-fit: cover;
	margin-bottom: 0.5rem;
`
const StyledName = styled.h3`
	font-size: var(--font-size-lg);
	font-weight: 600;
	margin-bottom: 0.5rem;
`

const StyledInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.8rem;
`

const StyledJob = styled.p`
	color: var(--color-gray-4);
	font-size: var(--font-size-base);
	line-height: 1;
`

const StyledScore = styled.span`
	color: var(--color-yellow);
	font-weight: 500;
`

const StyledRemove = styled.div`
	position: absolute;
	top: -0.5rem;
	right: -0.5rem;
`