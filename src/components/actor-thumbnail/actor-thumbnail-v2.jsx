import { FiThumbsUp } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { MdOutlineModeEdit } from 'react-icons/md'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'

import { BADGE_TYPE, ICON_POSITION, BUTTON_TYPE } from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

import { ActorReadMore, StyledActorReadMore } from 'components/actor-read-more/actor-read-more'
import { Badges, StyledBadges } from 'components/badges/badges'
import { Button } from 'components/button/button'

import styles from './actor-thumbnail.module.scss'

//? What is a pure function?
function generateBadgesFromHobbies(hobbies) {
	if (!Array.isArray(hobbies)) return []

	return hobbies.map((hobby) => ({
		type: BADGE_TYPE.PRIMARY,
		size: SIZE.XS,
		text: hobby,
		id: nanoid(), //? What is nanoid? DON'T generate dynamic keys inside JSX. Why?
	}))
}

export const ActorThumbnailV2 = ({ actor, setMessage }) => {
	const { hobbies, image, firstName, lastName, job, score, description } = actor

	const [badges, setBadges] = useState([])

	//? DON'T call the function directly inside the component. Why?
	// const badges = generateBadgesFromHobbies(hobbies)

	//? DO call the function inside useEffect. Why?
	useEffect(() => {
		setBadges(generateBadgesFromHobbies(hobbies))
	}, [hobbies])
	return (
		<article className={styles.thumbnail}>
			<img src={image} alt={`${firstName} ${lastName}`} className={styles.image} />

			<div className={styles.content}>
				<p className={styles.name}>
					{firstName} {lastName}
				</p>

				<p className={styles.info}>
					<span className={styles.job}>{job}</span>

					<span className={styles.score}>
						{score} <FiThumbsUp />
					</span>
				</p>

				<Badges badges={badges} className={styles.actorBadges} />

				<ActorReadMore text={description} limit={80} className={styles.readMore} />

				<Button
					type={BUTTON_TYPE.SECONDARY}
					isFullWidth={true}
					icon={<MdOutlineModeEdit />}
					iconPosition={ICON_POSITION.RIGHT}
					onClick={() => setMessage(nanoid())}>
					Edit
				</Button>

				<div className={styles.remove}>
					<Button type={BUTTON_TYPE.CIRCLE} icon={<GrClose />} />
				</div>
			</div>
		</article>
	)
}
