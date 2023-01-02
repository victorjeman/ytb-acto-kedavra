import { nanoid } from 'nanoid'

import { BADGE_TYPE } from '~/common/constants/general.constants'
import { SIZE } from '~/common/constants/size.constants'

export const ACTOR = {
	score: 80,
	image: '/images/actors/leonardo.jpg',
	firstName: 'Leonardo',
	lastName: 'Dicaprio',
	job: 'Actor & Writer',
	hobbies: ['Traveling', 'Reading', 'Puzzles'],
	description:
		"Leonardo is an American actor and film producer. Known for his work as a leading man in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards. As of 2019, his films have grossed over $7.2 billion worldwide, and he has been placed eight times in annual rankings of the world's highest-paid actors.",
}

export const BADGES = [
	{ type: BADGE_TYPE.PRIMARY, text: 'Actor', size: SIZE.XS, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Writer', size: SIZE.XS, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Director', size: SIZE.BASE, id: nanoid() },
	{ type: BADGE_TYPE.PRIMARY, text: 'Something else', size: SIZE.BASE, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Manager', size: SIZE.XL, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Programmer', size: SIZE.XL, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Dancer', size: SIZE.XL2, id: nanoid() },
	{ type: BADGE_TYPE.SECONDARY, text: 'Guru', size: SIZE.XL2, id: nanoid() },
]

export const ACTORS = [
	ACTOR,
	{ ...ACTOR, hobbies: ['Traveling', 'Reading', 'Puzzles', 'Traveling', 'Something else'] },
]
