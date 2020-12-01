import * as React from "react"
import { render } from "react-dom"
import Controls from "./Controls"
import Emotes from "./Emotes"
import { initialState, reducer, setWindowSize, SiteContext } from "./store"
import Webcam from "./Webcam"
import WindowSizeObserver from "./WindowResizeObserver"

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const contextValue = React.useMemo(() => ({ state, dispatch }), [
        state,
        dispatch,
    ])

    // React.useEffect(() => {
    //     console.log("change", Object.keys(contextValue.state.horses))
    // }, [contextValue.state])

    return (
        <SiteContext.Provider value={contextValue}>
            <WindowSizeObserver />
            {/* <Webcam /> */}
            <Emotes />
            <Controls />
        </SiteContext.Provider>
    )
}

render(<App />, document.getElementById("root"))
