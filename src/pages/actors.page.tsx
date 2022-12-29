// import { Actors } from 'components/actors/actors'
import { Actors } from 'components/actors/actors-redux-toolkit'

export const ActorsPage = () => {
	return (
		<div>
			<h1>Actors page</h1>

			<div>actor filter</div>
			<Actors />
		</div>
	)
}
