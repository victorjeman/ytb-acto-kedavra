import { useState } from 'react'
import styled from 'styled-components/macro'
import { MdOutlineModeEdit } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { nanoid } from 'nanoid'

import {
	BUTTON_TYPE,
	BADGE_TYPE,
	ICON_POSITION,
	NOTIFICATION_TYPE,
	NOTIFICATION_ACTION_TYPE,
} from 'constants/general.constants'
import { SIZE } from 'constants/size.constants'

import { PageHeader } from 'components/page-header/page-header'
import { PageFooter } from 'components/page-footer/page-footer'
import { Button } from 'components/button/button'
import { ReadMore } from 'components/read-more/read-more'
import { ActorReadMore } from 'components/actor-read-more/actor-read-more'
import { Badge } from 'components/badge/badge'
import { BadgeV2 } from 'components/badge/badge-v2'
import { Badges } from 'components/badges/badges'
import { ActorThumbnail } from 'components/actor-thumbnail/actor-thumbnail'
import { Modal } from 'components/modal/modal'
import { SelectAllActors } from 'components/select-all-actors/select-all-actors'
import { CallToAction } from 'components/call-to-action/call-to-action'
import { useNotification } from 'services/notification-provider/notification-provider'
import { ActorForm } from 'components/actor-form/actor-form'
import { ActorFormV2 } from 'components/actor-form/actor-form-v2'
import { ActorFormV3 } from 'components/actor-form/actor-form-v3'
import { ActorThumbnailV2 } from 'components/actor-thumbnail/actor-thumbnail-v2'
import { IActor } from 'models/common.models'

const ACTOR = {
	score: 80,
	image: '/images/actors/leonardo.jpg',
	firstName: 'Leonardo',
	lastName: 'Dicaprio',
	job: 'Actor & Writer',
	hobbies: ['Traveling', 'Reading', 'Puzzles'],
	description:
		"Leonardo is an American actor and film producer. Known for his work as a leading man in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards. As of 2019, his films have grossed over $7.2 billion worldwide, and he has been placed eight times in annual rankings of the world's highest-paid actors.",
}

const BADGES = [
	{ type: BADGE_TYPE.PRIMARY, text: 'Actor', size: SIZE.XS, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Writer', size: SIZE.XS, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Director', size: SIZE.BASE, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Something else', size: SIZE.BASE, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Manager', size: SIZE.XL, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Programmer', size: SIZE.XL, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Dancer', size: SIZE.XL2, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Guru', size: SIZE.XL2, id: nanoid() },
]

const ACTORS = [
	ACTOR,
	{ ...ACTOR, hobbies: ['Traveling', 'Reading', 'Puzzles', 'Traveling', 'Something else'] },
]

export const StyleGuidePage = () => {
	const [message, setMessage] = useState('hello')
	const [showMeSomething, setShowMeSomething] = useState(false)
	const [actors, setActors] = useState<IActor[]>([])

	const dispatch = useNotification()

	const sayHello = () => {
		console.log(message)
	}

	const addNotification = () => {
		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: NOTIFICATION_TYPE.SUCCESS,
			message: 'Un mesaj frumos',
		})
	}

	const addActor = (actor: IActor) => {
		setActors([...actors, actor])
	}

	return (
		<main className='app'>
			<PageHeader />
			<StyledH1>My components</StyledH1>

			<StyledSection>
				<StyledH2>My Buttons</StyledH2>

				<StyledDiv>
					<Button onClick={sayHello}>default</Button>

					<Button onClick={sayHello} disabled>
						disabled
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.LG} onClick={sayHello}>
						primary - lg
					</Button>

					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.XL} onClick={sayHello}>
						primary - xl
					</Button>

					<Button type={BUTTON_TYPE.PRIMARY} size={SIZE.XL2} onClick={sayHello}>
						primary - xl2
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.XS} onClick={sayHello}>
						secondary - xs
					</Button>

					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.SM} onClick={sayHello}>
						secondary - sm
					</Button>

					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.BASE} onClick={sayHello}>
						secondary - base
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL2} onClick={sayHello}>
						help - xl2
					</Button>

					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL3} onClick={sayHello}>
						help - xl3
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.RIGHT}
						onClick={sayHello}>
						with icon
					</Button>

					<Button
						type={BUTTON_TYPE.SECONDARY}
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.LEFT}
						onClick={sayHello}>
						with icon
					</Button>

					<Button
						type={BUTTON_TYPE.HELP}
						icon={<MdOutlineModeEdit />}
						iconPosition={ICON_POSITION.RIGHT}
						onClick={sayHello}>
						with icon
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.HELP} size={SIZE.XL2} isFullWidth={true} onClick={sayHello}>
						full width xl2 help
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button type={BUTTON_TYPE.SECONDARY} size={SIZE.XL} isFullWidth={true} onClick={sayHello}>
						full width xl secondary
					</Button>
				</StyledDiv>

				<StyledDiv>
					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XS}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.SM}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.BASE}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.LG}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL2}></Button>

					<Button
						onClick={sayHello}
						type={BUTTON_TYPE.CIRCLE}
						icon={<GrClose />}
						size={SIZE.XL3}></Button>
				</StyledDiv>
			</StyledSection>

			<StyledSection>
				<StyledH2>Read more</StyledH2>

				<StyledDiv>
					<ReadMore
						text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque eveniet ex ipsam repudiandae debitis doloribus sequi deserunt quos consequuntur? Commodi non aliquam voluptatum. Cumque est aliquam maiores, consectetur quos ea.'
						limit={150}
					/>
				</StyledDiv>

				<StyledDiv>
					<ActorReadMore text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque eveniet ex ipsam repudiandae debitis doloribus sequi deserunt quos consequuntur? Commodi non aliquam voluptatum. Cumque est aliquam maiores, consectetur quos ea.' />
				</StyledDiv>
			</StyledSection>

			<StyledSection>
				<StyledH2>Single Badges</StyledH2>

				<StyledDiv>
					<Badge>default</Badge>

					<Badge type={BADGE_TYPE.PRIMARY}>primary base</Badge>

					<Badge type={BADGE_TYPE.SECONDARY} size={SIZE.LG}>
						secondary size lg
					</Badge>

					<Badge type={BADGE_TYPE.PRIMARY} size={SIZE.XL2}>
						primary size xl2
					</Badge>

					<BadgeV2>Badge v2</BadgeV2>
					<BadgeV2 type={BADGE_TYPE.SECONDARY}>Badge v2</BadgeV2>
					<BadgeV2 type={BADGE_TYPE.SECONDARY} size={SIZE.XL4}>
						Badge v2
					</BadgeV2>
				</StyledDiv>
			</StyledSection>

			<StyledSection>
				<StyledH2>List of Badges</StyledH2>
				<StyledDiv>
					<Badges badges={BADGES} />
				</StyledDiv>
			</StyledSection>

			<StyledSection>
				<StyledH2>Actor Thumbnail</StyledH2>

				<p style={{ marginBottom: '1rem' }}> I'm a random id from app.js {message}</p>

				<StyledDiv2>
					{/* <div className='column'>
						<ActorThumbnail setMessage={setMessage} actor={ACTORS[0]} />
					</div>

					<div className='column'>
						<ActorThumbnail setMessage={setMessage} actor={ACTORS[1]} />
					</div> */}

					<div className='column'>
						<ActorThumbnailV2 setMessage={setMessage} actor={ACTORS[1]} />
					</div>
				</StyledDiv2>
			</StyledSection>

			<StyledSection>
				<StyledH2>Modal</StyledH2>

				<StyledDiv2>
					<Button onClick={() => setShowMeSomething(true)}>Show Modal</Button>

					<Modal
						isOpen={showMeSomething}
						title='My fancy modal'
						onClose={() => setShowMeSomething(false)}>
						<>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam nobis aut
								praesentium doloribus accusamus dignissimos ducimus laudantium ratione dolorem sint!
							</p>

							<Button onClick={() => {}}>Button</Button>

							<p>Dolorum id sit velit porro natus suscipit illo iure magnam.</p>

							<Badge>Badge</Badge>
						</>
					</Modal>
				</StyledDiv2>
			</StyledSection>

			<StyledSection>
				<StyledH2>Select all actors</StyledH2>

				<StyledDiv2>
					<SelectAllActors selectedActors={0} />
				</StyledDiv2>
			</StyledSection>

			<StyledSection>
				<StyledH2>Call to action</StyledH2>

				<StyledDiv2>
					<CallToAction />
				</StyledDiv2>
			</StyledSection>

			<StyledSection>
				<StyledH2>Multiple Notification</StyledH2>

				<StyledDiv3>
					<Button onClick={addNotification}>Add new notification</Button>
				</StyledDiv3>
			</StyledSection>

			<StyledSection>
				<StyledH2>Actor form</StyledH2>

				<StyledDiv3>
					{actors.map((actor, index) => (
						<ActorThumbnail onDelete={() => {}} actor={actor} key={index} />
					))}

					{/* <ActorForm onSubmit={addActor} /> */}

					{/* <ActorFormV2 onSubmit={addActor} /> */}

					<ActorFormV3 onSubmit={addActor} />
				</StyledDiv3>
			</StyledSection>

			<PageFooter />
		</main>
	)
}

const StyledH1 = styled.h1`
	text-align: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
`

const StyledSection = styled.section`
	padding: 1rem;
	max-width: 600px;
	margin-right: auto;
	margin-left: auto;
	border: 2px solid #a0a3bd;
	margin-top: 1rem;
`

const StyledH2 = styled.h2`
	border-bottom: 2px solid #a0a3bd;
	padding-bottom: 0.4rem;
	margin-bottom: 1.5rem;
`

const StyledDiv = styled.div`
	margin-bottom: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;

	&:last-of-type {
		margin-bottom: 0;
	}
`

const StyledDiv2 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	> .column {
		width: 48%;
	}
`

const StyledDiv3 = styled.div``
