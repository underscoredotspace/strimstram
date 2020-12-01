import * as React from "react"
import { Horse } from "./store/types"

const Horse: React.FC<Horse> = ({ xPos, yPos }) => (
    <span
        style={{
            position: "absolute",
            transform: `translate(${xPos}px, ${yPos}px`,
        }}
    >
        🐴
    </span>
)

export default Horse
