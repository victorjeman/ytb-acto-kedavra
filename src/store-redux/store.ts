import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import actorReducer from './actor.slice'
import { actorAPI } from 'services/actor-service/actor-rtk.service'

export const store = configureStore({
	reducer: { actorReducer, [actorAPI.reducerPath]: actorAPI.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actorAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
