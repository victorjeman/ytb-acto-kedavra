import { createContext, useContext } from 'react'

import { ActorStore } from '~/features/actors-with-mobx/store/actor.store'

const mobxStore = {
	actorStore: new ActorStore(),
}

export const useMobxStore = () => {
	return useContext(createContext(mobxStore))
}
