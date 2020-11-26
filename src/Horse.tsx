import * as React from "react"
import { SiteContext } from "./store"
import { Horse } from "./store/types"

interface HorseProps {
    id: string
}

const invert = (val: number) => 0 - val
const outside = (pos: number, max: number) => pos <= 0 || pos >= max - 36

const Horse: React.FC<HorseProps> = ({ id }) => {
    const { state } = React.useContext(SiteContext)

    const start = state.horses[id]

    const [horse, setHorse] = React.useState(start)
    const requestRef = React.useRef(0)

    function animate() {
        setHorse((currentHorse) => {
            const newPos = {
                xPos: currentHorse.xPos + currentHorse.xVel,
                yPos: currentHorse.yPos + currentHorse.yVel,
            }

            const xOutside = outside(newPos.xPos, state.width)
            const yOutside = outside(newPos.yPos, state.height)

            return {
                xVel: xOutside ? invert(currentHorse.xVel) : currentHorse.xVel,
                yVel: yOutside ? invert(currentHorse.yVel) : currentHorse.yVel,
                xPos: xOutside ? currentHorse.xPos : newPos.xPos,
                yPos: yOutside ? currentHorse.yPos : newPos.yPos,
            }
        })
        requestRef.current = requestAnimationFrame(animate)
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return (
        <span
            id={id}
            style={{
                position: "absolute",
                transform: `translate(${horse.xPos}px, ${horse.yPos}px`,
            }}
        >
            🐴
        </span>
    )
}

export default Horse
