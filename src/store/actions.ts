import { Action, Actions, Horse, HorseId } from "./types"

export const addHorse = (): Action => ({
    type: Actions.addHorse,
})

export const moveHorse = (id: HorseId, { xPos, yPos, xVel, yVel }: Horse) => ({
    type: Actions.moveHorse,
    payload: { id, horse: { xPos, yPos, xVel, yVel } },
})

export const setWindowSize = (width: number, height: number): Action => ({
    type: Actions.setWindowSize,
    payload: { width, height },
})
