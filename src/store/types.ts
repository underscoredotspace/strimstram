export interface Horse {
    xPos: number
    yPos: number
    xVel: number
    yVel: number
}

export type HorseId = string

export type RootState = {
    width: number
    height: number
    horses: Record<HorseId, Horse>
}

export enum Actions {
    addHorse,
    moveHorse,
    setWindowSize,
}

export type Action = { type: Actions; payload?: any }
export type Dispatch = (action: Action) => void
