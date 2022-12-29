import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ACTOR_API } from 'constants/general.constants'
import { IActor } from 'models/common.models'

export const actorAPI = createApi({
	reducerPath: 'actorAPI',
	baseQuery: fetchBaseQuery({ baseUrl: ACTOR_API }),
	endpoints: (builder) => ({
		getActors: builder.query<IActor[], string>({
			query: () => ACTOR_API,
		}),

		addActor: builder.mutation<IActor, IActor>({
			query(actor) {
				return {
					url: ACTOR_API,
					method: 'POST',
					body: actor,
				}
			},
			transformResponse: (result: IActor) => result,
		}),

		deleteActor: builder.mutation<IActor, IActor>({
			query(actor) {
				return {
					url: `${ACTOR_API}/${actor.id}`,
					method: 'DELETE',
				}
			},
			transformResponse: (result: IActor, meta, arg) => arg,
		}),

		updateActor: builder.mutation<IActor, IActor>({
			query(actor) {
				return {
					url: `${ACTOR_API}/${actor.id}`,
					method: 'PUT',
					body: actor,
				}
			},
			transformResponse: (result: IActor) => result,
		}),
	}),
})

export const {
	useGetActorsQuery,
	useAddActorMutation,
	useDeleteActorMutation,
	useUpdateActorMutation,
} = actorAPI
