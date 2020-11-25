import * as React from "react"
import { Horse as BaseHorse } from "./store/types"

interface HorseProps extends Pick<BaseHorse, "xPos" | "yPos"> {
    id: string
}

const Horse: React.FC<HorseProps> = ({ id, xPos, yPos }) => (
    <span
        id={id}
        style={{
            position: "absolute",
            transform: `translate(${xPos}px, ${yPos}px`,
        }}
    >
        🐴
    </span>
)

export default Horse
