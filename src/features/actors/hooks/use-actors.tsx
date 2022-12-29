import { useEffect, useState } from 'react'

import { IActor } from '~/features/actors/models/actor.models'

const API = 'http://localhost:3004'

export const useActors = () => {
	const [actors, setActors] = useState<IActor[]>([])

	useEffect(() => {
		;(async () => {
			const actorsData = await window.fetch(`${API}/actors`)
			const actors = await actorsData.json()

			setActors(actors)
		})()
	}, [])

	return actors
}
