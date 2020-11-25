import * as React from "react"
import { useRef } from "react"
import wc from "webcam-easy"

const Webcam = () => {
    const ref = useRef(null)

    React.useEffect(() => {
        if (!ref.current) {
            return
        }

        const webcam = new wc(ref.current, "user")
        webcam.start().then(console.log).catch(console.error)
    }, [ref])

    return <video ref={ref} autoPlay playsInline width="640" height="480" />
}

export default Webcam
