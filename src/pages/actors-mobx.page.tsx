import { ActorListWithMobx } from '~/features/actors-with-mobx/components/actor-list-with-mobx/actor-list-with-mobx'

export const ActorsWithMobxPage = () => {
	return (
		<div>
			<h1>Actors page implemented with mobx</h1>

			<div>actor filter</div>
			<ActorListWithMobx />
		</div>
	)
}
