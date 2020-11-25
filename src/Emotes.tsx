import * as React from "react"
import Horse from "./Horse"
import { setWindowSize, SiteContext } from "./store"

const Emotes = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const { dispatch, state } = React.useContext(SiteContext)

    React.useEffect(() => {
        if (!ref.current) {
            return
        }

        const { width, height } = ref.current.getBoundingClientRect()
        dispatch(setWindowSize(width, height))
    }, [ref])

    return (
        <div className="overlay" id="emotes" ref={ref}>
            {Object.entries(state.horses).map(([id, horse]) => (
                <Horse {...{ id, ...horse }} />
            ))}
        </div>
    )
}

export default Emotes
