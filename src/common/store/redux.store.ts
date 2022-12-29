import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import actorReducer from '~/features/actors-with-redux/store/actor.slice.store'
import { actorAPI } from '~/features/actors-with-redux/store/actor.service.store'

export const reduxStore = configureStore({
	reducer: { actorReducer, [actorAPI.reducerPath]: actorAPI.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actorAPI.middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

setupListeners(reduxStore.dispatch)
