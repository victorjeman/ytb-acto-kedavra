import { useEffect, useState } from 'react'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from 'constants/general.constants'
import { IActor } from 'models/common.models'
import { useNotification } from 'services/notification-provider/notification-provider'
import { deleteActorByIdAPI, addActorAPI, editActorAPI } from 'services/actor-service/actor.service'
import { useActors } from 'hooks/use-actors'

import { ActorThumbnail } from 'components/actor-thumbnail/actor-thumbnail'
import { ActorForm } from 'components/actor-form/actor-form'
import { Button } from 'components/button/button'
import { Modal } from 'components/modal/modal'

export const Actors = () => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [actorToEdit, setActorToEdit] = useState<IActor | undefined>()
	const [actors, setActors] = useState<IActor[]>([])

	const initialActors = useActors()
	const dispatch = useNotification()

	useEffect(() => {
		setActors(initialActors)
	}, [initialActors])

	const deleteActor = async (id: number) => {
		const { success, data } = await deleteActorByIdAPI(id, actors)

		setActors(data)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully deleted!' : "Wasn't able to delete the actor",
		})
	}

	const addActor = async (actor: IActor) => {
		const { data, success } = await addActorAPI(actor, actors)

		setActors(data)
		setShowModal(false)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully added!' : 'Actor add error!',
		})
	}

	const showFormActorInEditMode = async (id: number | undefined) => {
		const actorToEdit = actors.find((actor) => actor.id === id)
		setActorToEdit(actorToEdit)
		setShowModal(true)
	}

	const editActor = async (actorToEdit: IActor) => {
		const { data, success } = await editActorAPI(actorToEdit, actors)

		setActors(data)
		setShowModal(false)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully edited!' : "Wasn't able to edit the actor!",
		})
	}

	const submit = (actor: IActor) => {
		if (actorToEdit) editActor(actor)
		else addActor(actor)
	}

	return (
		<section>
			{actors?.map((actor) => (
				<div key={actor.nanoid}>
					<ActorThumbnail actor={actor} onDelete={deleteActor} onEdit={showFormActorInEditMode} />
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
