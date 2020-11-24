import Webcam from "webcam-easy"

const webcamElement = document.getElementById("webcam")
const canvasElement = document.getElementById("canvas")

const webcam = new Webcam(webcamElement, "user", canvasElement)

webcam
    .start()
    .then((result) => {
        console.log("webcam started", result)
    })
    .catch((err) => {
        console.log(err)
    })
