export interface Horse {
    xPos: number
    yPos: number
    xVel: number
    yVel: number
}

export type RootState = {
    width: number
    height: number
    horses: Record<string, Horse>
}

export enum Actions {
    addHorse,
    setWindowSize,
}

export type Action = { type: Actions; payload?: any }
export type Dispatch = (action: Action) => void
