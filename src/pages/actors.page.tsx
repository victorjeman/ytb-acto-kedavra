import { ActorList } from '~/features/actors/components/actor-list/actor-list'

export const ActorsPage = () => {
	return (
		<div>
			<h1>Actors page</h1>

			<div>actor filter</div>
			<ActorList />
		</div>
	)
}
