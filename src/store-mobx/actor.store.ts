import { makeAutoObservable } from 'mobx'

import { ACTOR_API } from 'constants/general.constants'
import { IActor } from 'models/common.models'

const getActorIndexById = (actors: IActor[], actorToSearch: IActor) => {
	const checkActorId = (actor: IActor) => actor.id === actorToSearch.id
	const actorIndex = actors.findIndex(checkActorId)

	return actorIndex
}

export class ActorStore {
	actors: IActor[] = []
	showModal: boolean = false
	actorToUpdate: IActor | undefined

	constructor() {
		makeAutoObservable(this)
	}

	fetchActors = async () => {
		const response = await window.fetch(ACTOR_API)
		const actors = await response.json()

		if (response.ok) this.setActors(actors)

		return { success: response.ok }
	}

	handleActorSubmit = async (actor: IActor) => {
		const response = await window.fetch(ACTOR_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(actor),
		})

		const actorFromResponse = await response.json()

		if (response.ok) this.addActor(actorFromResponse)

		return { success: response.ok }
	}

	handleActorUpdate = async (actorToUpdate: IActor) => {
		const response = await window.fetch(`${ACTOR_API}/${actorToUpdate.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(actorToUpdate),
		})

		const updatedActor = await response.json()

		if (response.ok) {
			this.updateActor(updatedActor)
		}

		return {
			success: response.ok,
		}
	}

	handleActorDelete = async (actor: IActor) => {
		const response = await window.fetch(`${ACTOR_API}/${actor.id}`, { method: 'DELETE' })

		if (response.ok) this.deleteActor(actor)

		return { success: response.ok }
	}

	setActors = (actors: IActor[]) => {
		this.actors = actors
	}

	addActor = (actor: IActor) => {
		this.actors.push(actor)
	}

	updateActor = (actor: IActor) => {
		const actorToUpdateIndex = getActorIndexById(this.actors, actor)
		this.actors[actorToUpdateIndex] = actor
	}

	deleteActor = (actor: IActor) => {
		const actorToDeleteIndex = getActorIndexById(this.actors, actor)
		this.actors.splice(actorToDeleteIndex, 1)
	}

	setShowModal = (visible: boolean) => {
		this.showModal = visible
	}

	setActorToUpdate = (actor?: IActor) => {
		this.actorToUpdate = actor
	}
}
