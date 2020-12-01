import * as React from "react"
import Horse from "./Horse"
import { moveHorse, SiteContext } from "./store"
import { Horse as HorseType, HorseId, RootState } from "./store/types"

const invert = (val: number) => 0 - val
const outside = (pos: number, max: number) => pos <= 0 || pos >= max - 36

const Emotes: React.FC = () => {
    const { state, dispatch } = React.useContext(SiteContext)

    const rafRef = React.useRef(0)

    const animateAll = (h: RootState["horses"]) => {
        console.log("animateAll", Object.entries(state.horses).length)

        Object.entries(h).forEach(([id, horse]) => {
            animate(id, horse)
        })

        rafRef.current = requestAnimationFrame(() => animateAll(state.horses))
    }

    function animate(id: HorseId, currentHorse: HorseType) {
        console.log("animate one")

        const newPos = {
            xPos: currentHorse.xPos + currentHorse.xVel,
            yPos: currentHorse.yPos + currentHorse.yVel,
        }

        const xOutside = outside(newPos.xPos, window.innerWidth)
        const yOutside = outside(newPos.yPos, window.innerHeight)

        const newHorse = {
            xVel: xOutside ? invert(currentHorse.xVel) : currentHorse.xVel,
            yVel: yOutside ? invert(currentHorse.yVel) : currentHorse.yVel,
            xPos: xOutside ? currentHorse.xPos : newPos.xPos,
            yPos: yOutside ? currentHorse.yPos : newPos.yPos,
        }

        dispatch(moveHorse(id, newHorse))
    }

    React.useEffect(() => {
        rafRef.current = requestAnimationFrame(() => animateAll(state.horses))
        return () => cancelAnimationFrame(rafRef.current)
    })

    return (
        <div className="overlay" id="emotes">
            {Object.entries(state.horses).map(([id, horse]) => (
                <Horse key={`horse-${id}`} {...horse} />
            ))}
        </div>
    )
}

export default Emotes
