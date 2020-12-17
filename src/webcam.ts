import * as faceapi from "face-api.js"
import { Point } from "face-api.js"
import { getCenterPoint } from "face-api.js/build/commonjs/utils"

const videoEl = document.querySelector("video")!
const canvasEl = document.querySelector("canvas")!
const ctx = canvasEl.getContext("2d")!

const mask = new Image()
mask.src = require("./headphones.png")

let maskLoaded = false
mask.onload = () => {
    maskLoaded = true
}

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
const FRAMERATE = 60
const ADJUSTMENT = 1.5

function drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    w: number,
    h: number,
    degrees: number
) {
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate((-degrees * Math.PI) / 180.0)
    ctx.translate(-x - w / 2, -y - h / 2)
    ctx.drawImage(image, x, y, w, h)
    ctx.restore()
}

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
            const height = resized.detection.box.height

            const width = getDistance(right.x - left.x, right.y - left.y)
            const angle = getAngle(right.x - left.x, right.y - left.y)

            const adjusted = {
                h: height * ADJUSTMENT,
                w: width * ADJUSTMENT,
            }

            const tl = getLineEnd(left.x, left.y, angle - 90, height / 2)
            const tr = getLineEnd(tl.x2, tl.y2, angle, width)
            const tm = getCenterPoint([
                { x: tl.x2, y: tl.y2 } as Point,
                { x: tr.x2, y: tr.y2 } as Point,
            ])

            if (maskLoaded) {
                drawImage(
                    mask,
                    tm.x - adjusted.w / 2,
                    tm.y - adjusted.h / 6,
                    adjusted.w,
                    (adjusted.w / mask.width) * mask.height,
                    angle + 90
                )
            }
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
