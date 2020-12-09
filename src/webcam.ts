import * as faceapi from "face-api.js"

const videoEl = document.querySelector("video")!
const canvasEl = document.querySelector("canvas")!
const ctx = canvasEl.getContext("2d")!

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

let lastUpdate = 0
const FRAMERATE = 300

async function start(time: number) {
    if (lastUpdate + FRAMERATE < time) {
        lastUpdate = time

        const detection = await faceapi
            .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true)

        if (detection) {
            const dims = faceapi.matchDimensions(canvasEl, videoEl, true)
            const resized = faceapi.resizeResults(detection, dims)
            const jaw = resized.landmarks.getJawOutline()
            const right = jaw[0]
            const left = jaw[jaw.length - 1]
            const { height } = resized.detection.box
            const width = getDistance(right.x - left.x, right.y - left.y)

            const angle = getAngle(right.x - left.x, right.y - left.y)

            ctx.beginPath()
            ctx.moveTo(left.x, left.y)
            ctx.lineTo(right.x, right.y)

            ctx.moveTo(left.x, left.y)
            const tl = getLineEnd(left.x, left.y, angle - 90, height / 2)
            ctx.lineTo(tl.x2, tl.y2)

            const tr = getLineEnd(tl.x2, tl.y2, angle, width)
            ctx.lineTo(tr.x2, tr.y2)

            ctx.lineTo(right.x, right.y)

            ctx.stroke()
        }
    }
    requestAnimationFrame(start)
}

const getDistance = (xd: number, yd: number) =>
    Math.sqrt(Math.pow(Math.abs(xd), 2) + Math.pow(Math.abs(yd), 2))

const getAngle = (xd: number, yd: number) =>
    Math.atan2(xd, yd) * (180 / Math.PI)

const getLineEnd = (x1: number, y1: number, angle: number, length: number) => {
    angle = (angle * Math.PI) / 180
    const x2 = x1 + length * Math.sin(angle)
    const y2 = y1 + length * Math.cos(angle)
    return { x2, y2 }
}
