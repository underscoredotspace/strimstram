import { createContext } from "react"
import { initialState } from "./reducer"
import { Dispatch, RootState } from "./types"

export const SiteContext = createContext<{
    state: RootState
    dispatch: Dispatch
}>({
    state: initialState,
    dispatch: () => null,
})
