import { Action, Actions, RootState } from "./types"
import { generate } from "shortid"

const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const initialState: RootState = {
    width: 0,
    height: 0,
    horses: {},
}

const VELOCITYS = [-2, -3, 3, 2]

export const reducer = (state: RootState, action: Action): RootState => {
    switch (action.type) {
        case Actions.addHorse:
            return {
                ...state,
                horses: {
                    ...state.horses,
                    [generate()]: {
                        xPos: random(0, state.width - 36),
                        yPos: random(0, state.height - 36),
                        xVel: VELOCITYS[random(0, 3)],
                        yVel: VELOCITYS[random(0, 3)],
                    },
                },
            }

        case Actions.moveHorse:
            // console.log("moveHorse", JSON.stringify(action.payload))

            return {
                ...state,
                horses: {
                    ...state.horses,
                    [action.payload.id]: action.payload.horse,
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
