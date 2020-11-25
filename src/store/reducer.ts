import { Action, Actions, RootState } from "./types"
import { generate } from "shortid"

const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const initialState: RootState = {
    width: 0,
    height: 0,
    horses: {},
}

export const reducer = (state: RootState, action: Action): RootState => {
    console.log(action)

    switch (action.type) {
        case Actions.addHorse:
            return {
                ...state,
                horses: {
                    ...state.horses,
                    [generate()]: {
                        xPos: random(0, state.width),
                        yPos: random(0, state.height),
                        xVel: random(-2, 2),
                        yVel: random(-2, 2),
                    },
                },
            }

        case Actions.setWindowSize:
            return {
                ...state,
                width: action.payload.width ?? 0,
                height: action.payload.height ?? 0,
            }
        default:
            return state
    }
}
