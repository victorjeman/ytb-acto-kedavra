import { useEffect, useState } from 'react'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from 'common/constants/general.constants'
import { IActor } from '~/features/actors/models/actor.models'
import { useNotificationDispatch } from '~/common/services/notification-provider/notification-provider'
import {
	deleteActorByIdAPI,
	addActorAPI,
	editActorAPI,
} from '~/features/actors/services/actor.service'
import { useActors } from '~/features/actors/hooks/use-actors'

import { ActorThumbnail } from '~/common/components/actor-thumbnail/actor-thumbnail'
import { ActorForm } from '~/common/components/actor-form/actor-form'
import { Button } from '~/common/components/button/button'
import { Modal } from '~/common/components/modal/modal'

export const ActorList = () => {
	const initialActors = useActors()
	const notificationDispatch = useNotificationDispatch()

	const [showModal, setShowModal] = useState<boolean>(false)
	const [actorToEdit, setActorToEdit] = useState<IActor | undefined>()
	const [actors, setActors] = useState<IActor[]>([])

	useEffect(() => {
		setActors(initialActors)
	}, [initialActors])

	const deleteActor = async (actor: IActor) => {
		const { success, data } = await deleteActorByIdAPI(actor.id, actors)

		setActors(data)

		notificationDispatch({
			type: NOTIFICATION_ACTION_TYPE.ADD,
			payload: {
				type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
				message: success ? 'Actor successfully deleted!' : "Wasn't able to delete the actor",
			},
		})
	}

	const addActor = async (actor: IActor) => {
		const { data, success } = await addActorAPI(actor, actors)

		setActors(data)
		setShowModal(false)

		notificationDispatch({
			type: NOTIFICATION_ACTION_TYPE.ADD,
			payload: {
				type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
				message: success ? 'Actor successfully added!' : 'Actor add error!',
			},
		})
	}

	const showFormActorInEditMode = async (actor: IActor) => {
		setActorToEdit(actor)
		setShowModal(true)
	}

	const editActor = async (actorToEdit: IActor) => {
		const { data, success } = await editActorAPI(actorToEdit, actors)

		setActors(data)
		setShowModal(false)

		notificationDispatch({
			type: NOTIFICATION_ACTION_TYPE.ADD,
			payload: {
				type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
				message: success ? 'Actor successfully edited!' : "Wasn't able to edit the actor!",
			},
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
