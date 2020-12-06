import * as faceapi from "face-api.js"

const videoEl = document.querySelector("video")!
const canvasEl = document.querySelector("canvas")!

navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
    videoEl.srcObject = stream
})

videoEl.onloadedmetadata = () => {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
    ])
        .then(() => requestAnimationFrame(start))
        .catch(console.error)
}

async function start(_timer: number) {
    const detection = await faceapi
        .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)

    if (detection) {
        const dims = faceapi.matchDimensions(canvasEl, videoEl, true)
        const resized = faceapi.resizeResults(detection, dims)

        // faceapi.draw.drawDetections(canvasEl, resized)
        faceapi.draw.drawFaceLandmarks(canvasEl, resized)
    }

    requestAnimationFrame(start)
}
