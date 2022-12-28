import { ACTOR_API } from 'constants/general.constants'
import { IActor } from 'models/common.models'

export const fetchActorsAPI = async () => {
	const actorsData = await window.fetch(ACTOR_API)
	const actors = await actorsData.json()

	return actors
}

export const deleteActorByIdAPI = async (id: number, actors: IActor[]) => {
	const fetchResponse = await window.fetch(`${ACTOR_API}/${id}`, { method: 'DELETE' })

	let response = { data: actors, success: false }

	if (fetchResponse?.ok) {
		const data = actors.filter((actor) => actor.id !== id)
		response = {
			data,
			success: true,
		}
	}

	return response
}

export const addActorAPI = async (actor: IActor, actors: IActor[]) => {
	const fetchResponse = await window.fetch(ACTOR_API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(actor),
	})

	const data = await fetchResponse.json()

	let response = {
		data: actors,
		success: false,
	}

	if (fetchResponse?.ok) {
		response = {
			data: [...actors, data],
			success: true,
		}
	}

	return response
}

export const editActorAPI = async (actorToEdit: IActor, actors: IActor[]) => {
	const { id } = actorToEdit

	const fetchResponse = await window.fetch(`${ACTOR_API}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(actorToEdit),
	})

	let response = {
		data: actors,
		success: false,
	}

	if (fetchResponse?.ok) {
		const editedActorFromAPI = await fetchResponse.json()
		const actorToEditIndex = actors.findIndex((actor) => actorToEdit.id === actor.id)

		const actorsUpdated = [...actors]
		actorsUpdated[actorToEditIndex] = editedActorFromAPI

		response = {
			data: actorsUpdated,
			success: true,
		}
	}

	return response
}
