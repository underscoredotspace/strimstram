import * as React from "react"
import { render } from "react-dom"
import Controls from "./Controls"
import Emotes from "./Emotes"
import { initialState, reducer, SiteContext } from "./store"
import Webcam from "./Webcam"

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const contextValue = React.useMemo(() => {
        return { state, dispatch }
    }, [state, dispatch])

    React.useEffect(() => {
        console.log(JSON.stringify(state, null, 2))
    }, [state])

    return (
        <SiteContext.Provider value={contextValue}>
            <Webcam />
            <Emotes />
            <Controls />
        </SiteContext.Provider>
    )
}

render(<App />, document.getElementById("root"))
