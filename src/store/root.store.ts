import { createContext, useContext } from 'react'

import { ActorStore } from './actor.store'

const store = {
	actorStore: new ActorStore(),
}

export const useStore = () => {
	return useContext(createContext(store))
}
