import { useEffect, useState } from 'react'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from 'constants/general.constants'
import { IActor } from 'models/common.models'
import { useNotification } from 'services/notification-provider/notification-provider'

import { ActorThumbnail } from 'components/actor-thumbnail/actor-thumbnail'
import { ActorForm } from '~/components/actor-form/actor-form'
import { Button } from '~/components/button/button'
import { Modal } from '~/components/modal/modal'

export const Actors = () => {
	const [actors, setActors] = useState<IActor[]>([])
	const [showModal, setShowModal] = useState<boolean>(false)
	const [actorToEdit, setActorToEdit] = useState<IActor | undefined>()

	const dispatch = useNotification()

	useEffect(() => {
		;(async () => {
			const actorsData = await window.fetch('http://localhost:3004/actors')
			const actors = await actorsData.json()

			setActors(actors)
		})()
	}, [])

	const deleteActorById = async (id: number) => {
		const actorDeleted = await window.fetch(`http://localhost:3004/actors/${id}`, {
			method: 'DELETE',
		})

		if (actorDeleted?.ok) {
			const actorsUpdated = actors.filter((actor) => actor.id !== id)

			setActors(actorsUpdated)

			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.SUCCESS,
				message: 'Actor successfully deleted!',
			})
		} else {
			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.DANGER,
				message: "Wasn't able to delete the actor",
			})
		}
	}

	const addActor = async (actor: IActor) => {
		setShowModal(false)

		const response = await window.fetch('http://localhost:3004/actors', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(actor),
		})

		const addedActor = await response.json()

		if (response.ok) {
			setActors([...actors, addedActor])
			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.SUCCESS,
				message: 'Actor successfully added!',
			})
		} else {
			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.DANGER,
				message: 'Actor add error!',
			})
		}
	}

	const getActorById = (id: number | undefined) => actors.find((actor) => actor.id === id)

	const showFormActorInEditMode = async (id: number | undefined) => {
		setActorToEdit(getActorById(id))
		setShowModal(true)
	}

	const editActor = async (actorToEdit: IActor) => {
		const { id } = actorToEdit

		const response = await window.fetch(`http://localhost:3004/actors/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(actorToEdit),
		})

		if (response?.ok) {
			const editedActorFromAPI = await response.json()

			const actorToEditIndex = actors.findIndex((actor) => actorToEdit.id)

			const actorsUpdated = [...actors]
			actorsUpdated[actorToEditIndex] = editedActorFromAPI
			setActors(actorsUpdated)

			setShowModal(false)

			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.SUCCESS,
				message: 'Actor successfully edited',
			})
		} else {
			dispatch({
				actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
				type: NOTIFICATION_TYPE.DANGER,
				message: "Wasn't able to edit the actor",
			})
		}
	}

	const submit = (actor: IActor) => {
		if (actorToEdit) editActor(actor)
		else addActor(actor)
	}

	return (
		<section>
			{actors?.map((actor) => (
				<div key={actor.nanoid}>
					<ActorThumbnail
						actor={actor}
						onDelete={deleteActorById}
						onEdit={showFormActorInEditMode}
					/>
				</div>
			))}

			<Button size={'xl'} isFullWidth={true} onClick={() => setShowModal(true)}>
				Add actor
			</Button>

			<Modal isOpen={showModal} title='Add new actor' onClose={() => setShowModal(false)}>
				<>
					<ActorForm onSubmit={submit} actorToEdit={actorToEdit} />
				</>
			</Modal>
		</section>
	)
}
