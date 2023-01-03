import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { NOTIFICATION_ACTION_TYPE, NOTIFICATION_TYPE } from '~/common/constants/general.constants'
import { IActor } from '~/features/actors/models/actor.models'

import { useNotificationDispatch } from '~/common/services/notification-provider/notification-provider'
import {
	useAddActorMutation,
	useDeleteActorMutation,
	useGetActorsQuery,
	useUpdateActorMutation,
} from '~/features/actors-with-redux/store/actor.service.store'

import { useMobxStore } from '~/common/store/mobx.store'

import { useAppDispatch, useAppSelector } from '~/common/store/redux-hooks.store'
import {
	setActors,
	addActor,
	deleteActor,
	updateActor,
} from '~/features/actors-with-redux/store/actor.slice.store'

import { ActorThumbnail } from '~/common/components/actor-thumbnail/actor-thumbnail'
import { ActorForm } from '~/common/components/actor-form/actor-form'
import { Button } from '~/common/components/button/button'
import { Modal } from '~/common/components/modal/modal'

export const ActorListWithRedux = observer(() => {
	const notificationDispatch = useNotificationDispatch()
	const appDispatch = useAppDispatch()
	const { actors } = useAppSelector((state) => state.actorReducer)
	const { data } = useGetActorsQuery('')

	const [addActorAPI, { isSuccess: isActorAddedSuccessfully, data: addedActor }] =
		useAddActorMutation()
	const [deleteActorAPI, { isSuccess: isActorDeletedSuccessfully, data: deletedActor }] =
		useDeleteActorMutation()
	const [updateActorAPI, { isSuccess: isActorUpdatedSuccessfully, data: updatedActor }] =
		useUpdateActorMutation()

	const { actorStore } = useMobxStore()
	const { actors: actorsMobx, showModal, actorToUpdate } = actorStore

	useEffect(() => {
		actorStore.fetchActors()
		if (data) {
			appDispatch(setActors(data))
		}
	}, [data])

	useEffect(() => {
		if (addedActor) {
			notificationDispatch({
				type: NOTIFICATION_ACTION_TYPE.ADD,
				payload: {
					type: isActorAddedSuccessfully ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
					message: isActorAddedSuccessfully ? 'Actor successfully added!' : 'Actor add error!',
				},
			})

			appDispatch(addActor(addedActor))
		}
	}, [addedActor, isActorAddedSuccessfully])

	useEffect(() => {
		if (deletedActor) {
			appDispatch(deleteActor(deletedActor))

			notificationDispatch({
				type: NOTIFICATION_ACTION_TYPE.ADD,
				payload: {
					type: isActorDeletedSuccessfully ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
					message: isActorDeletedSuccessfully
						? 'Actor successfully deleted!'
						: "Wasn't able to delete the actor",
				},
			})
		}
	}, [deletedActor, isActorDeletedSuccessfully])

	useEffect(() => {
		if (updatedActor) {
			appDispatch(updateActor(updatedActor))

			notificationDispatch({
				type: NOTIFICATION_ACTION_TYPE.ADD,
				payload: {
					type: isActorUpdatedSuccessfully ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.DANGER,
					message: isActorUpdatedSuccessfully
						? 'Actor successfully edited!'
						: "Wasn't able to edit the actor!",
				},
			})
		}
	}, [updatedActor, isActorUpdatedSuccessfully])

	const handleActorSubmit = async (actor: IActor) => {
		addActorAPI(actor)

		actorStore.setShowModal(false)
	}

	const handleActorUpdate = async (actor: IActor) => {
		updateActorAPI(actor)

		actorStore.setShowModal(false)
		actorStore.setActorToUpdate()
	}

	const handleActorFormSubmit = (actor: IActor) => {
		if (actorToUpdate) handleActorUpdate(actor)
		else handleActorSubmit(actor)
	}

	const showFormActorInEditMode = async (actorToUpdate: IActor) => {
		const actorToEdit = actors.find((actor: IActor) => actor.id === actorToUpdate.id)
		actorStore.setActorToUpdate(actorToEdit)
		actorStore.setShowModal(true)
	}

	return (
		<section>
			{actors?.map((actor) => (
				<div key={actor.id}>
					<ActorThumbnail
						actor={actor}
						onDelete={deleteActorAPI}
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
