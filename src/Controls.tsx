import * as React from "react"
import { addHorse, SiteContext } from "./store"

const Controls = () => {
    const { dispatch } = React.useContext(SiteContext)

    return (
        <div className="overlay" id="controls">
            <button id="horse" onClick={() => dispatch(addHorse())}>
                HORSE!
            </button>
        </div>
    )
}

export default Controls
