import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IActor } from '~/features/actors/models/actor.models'
import { RootState } from '~/features/actors-with-redux/store/store'

interface ActorState {
	actors: IActor[]
}

const initialState: ActorState = {
	actors: [],
}

export const actorSlice = createSlice({
	name: 'actors',
	initialState: initialState,
	reducers: {
		setActors: (state, action: PayloadAction<IActor[]>) => {
			state.actors = action.payload
		},
		addActor: (state, action: PayloadAction<IActor>) => {
			state.actors = [...state.actors, action.payload]
		},
		updateActor: (state, action: PayloadAction<IActor>) => {
			const actorIndex = state.actors.findIndex((actor) => actor.id === action.payload.id)
			const actorsUpdated = [...state.actors]
			actorsUpdated[actorIndex] = action.payload

			state.actors = actorsUpdated
		},
		deleteActor: (state, action: PayloadAction<IActor>) => {
			state.actors = state.actors.filter((actor) => actor.id !== action.payload.id)
		},
	},
})

export const { setActors, addActor, updateActor, deleteActor } = actorSlice.actions

export const selectActors = (state: RootState) => state.actorReducer.actors

export default actorSlice.reducer
