import React, { useContext } from "react"
import { setWindowSize, SiteContext } from "./store"

const WindowSizeObserver = () => {
    const { dispatch } = useContext(SiteContext)

    const handleResize = () =>
        dispatch(setWindowSize(window.innerWidth, window.innerHeight))

    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return null
}

export default WindowSizeObserver
