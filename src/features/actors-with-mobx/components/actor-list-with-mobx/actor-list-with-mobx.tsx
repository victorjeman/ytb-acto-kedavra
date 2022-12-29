import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from '~/common/constants/general.constants'
import { IActor } from '~/features/actors/models/actor.models'
import { useNotification } from '~/common/services/notification-provider/notification-provider'
import { useMobxStore } from '~/common/store/mobx.store'

import { ActorThumbnail } from '~/common/components/actor-thumbnail/actor-thumbnail'
import { ActorForm } from '~/common/components/actor-form/actor-form'
import { Button } from '~/common/components/button/button'
import { Modal } from '~/common/components/modal/modal'

export const ActorListWithMobx = observer(() => {
	const dispatch = useNotification()

	const { actorStore } = useMobxStore()
	const { actors, showModal, actorToUpdate } = actorStore

	useEffect(() => {
		actorStore.fetchActors()
	}, [])

	const handleActorSubmit = async (actor: IActor) => {
		const { success } = await actorStore.handleActorSubmit(actor)

		actorStore.setShowModal(false)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully added!' : 'Actor add error!',
		})
	}

	const handleActorUpdate = async (actorToUpdate: IActor) => {
		const { success } = await actorStore.handleActorUpdate(actorToUpdate)

		actorStore.setShowModal(false)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully edited!' : "Wasn't able to edit the actor!",
		})
	}

	const handleActorDelete = async (actor: IActor) => {
		const { success } = await actorStore.handleActorDelete(actor)

		dispatch({
			actionType: NOTIFICATION_ACTION_TYPE.ADD_NOTIFICATION,
			type: success ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
			message: success ? 'Actor successfully deleted!' : "Wasn't able to delete the actor",
		})
	}

	const handleActorFormSubmit = (actor: IActor) => {
		if (actorToUpdate) handleActorUpdate(actor)
		else handleActorSubmit(actor)
	}

	const showFormActorInEditMode = async (actorToUpdate: IActor) => {
		const actorToEdit = actors.find((actor) => actor.id === actorToUpdate.id)
		actorStore.setActorToUpdate(actorToEdit)
		actorStore.setShowModal(true)
	}

	return (
		<section>
			{actors?.map((actor) => (
				<div key={actor.nanoid}>
					<ActorThumbnail
						actor={actor}
						onDelete={handleActorDelete}
						onEdit={showFormActorInEditMode}
					/>
				</div>
			))}

			<Button size={'xl'} isFullWidth={true} onClick={() => actorStore.setShowModal(true)}>
				Add actor
			</Button>

			<Modal
				isOpen={showModal}
				title='Add new actor'
				onClose={() => actorStore.setShowModal(false)}>
				<>
					<ActorForm onSubmit={handleActorFormSubmit} actorToEdit={actorToUpdate} />
				</>
			</Modal>
		</section>
	)
})
