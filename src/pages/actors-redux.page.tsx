import { ActorListWithRedux } from '~/features/actors-with-redux/components/actor-list-with-redux/actor-list-with-redux'

export const ActorsWithReduxPage = () => {
	return (
		<div>
			<h1>Actors page implemented with redux toolkit</h1>

			<div>actor filter</div>
			<ActorListWithRedux />
		</div>
	)
}
