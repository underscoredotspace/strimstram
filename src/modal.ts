const modal = document.querySelector("#modal")!
const button = modal.querySelector("button")!
const videoEl = document.querySelector("video")!

button.addEventListener("click", () => {
    modal.remove()

    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
        videoEl.srcObject = stream
    })
})
