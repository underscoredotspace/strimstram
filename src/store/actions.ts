import { Action, Actions } from "./types"

export const addHorse = (): Action => ({
    type: Actions.addHorse,
})

export const setWindowSize = (width: number, height: number): Action => ({
    type: Actions.setWindowSize,
    payload: { width, height },
})
