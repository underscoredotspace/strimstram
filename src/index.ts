import wc from "webcam-easy"

function elementFromString(elementString: TemplateStringsArray) {
    const element = document.createElement("div")
    element.innerHTML = `${elementString}`
    return element.firstChild as HTMLElement
}

interface HorsePosition {
    x: number
    y: number
    xVel: number
    yVel: number
}

enum SPEED {
    positive,
    negative,
    any,
}

const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const emotes = document.querySelector("#emotes") as HTMLElement
const video = document.querySelector("video") as HTMLElement
const addEmotes = [
    ...document.querySelectorAll("#add-emote > button"),
] as HTMLElement[]

const getSpeed = (type: SPEED) => {
    const speed = random(2, 5)

    if (type === SPEED.any) {
        return random(0, 1) === 0 ? speed : -speed
    }

    return type === SPEED.positive ? speed : -speed
}

const getInvertedSpeed = (speed: number) =>
    speed > 0 ? getSpeed(SPEED.negative) : getSpeed(SPEED.positive)

;(() => {
    if (!emotes || !addEmotes) {
        return
    }

    const webcam = new wc(video, "user")
    webcam.start()

    const horses: Horse[] = []

    ;(function animate() {
        const { width, height } = emotes.getBoundingClientRect()

        horses.forEach((horse) => horse.animate(width, height))
        requestAnimationFrame(animate)
    })()

    addEmotes.forEach((emote) =>
        emote.addEventListener("click", () => {
            const horse = new Horse(emote.textContent ?? "", emotes)
            horses.push(horse)
        })
    )
})()

class Horse {
    private currentPosition!: HorsePosition
    private element!: HTMLElement
    private parent: HTMLElement

    constructor(emote: string, parent: HTMLElement) {
        const { width, height } = parent.getBoundingClientRect()

        this.setPosition({
            x: random(0, width - 36),
            y: random(0, height - 36),
            xVel: getSpeed(SPEED.any),
            yVel: getSpeed(SPEED.any),
        })
        this.parent = parent
        this.createElement(parent, emote)
    }

    public animate(width: number, height: number) {
        this.move(width, height)
        this.update()
    }

    private setPosition(position: HorsePosition) {
        this.currentPosition = position
    }

    private createElement(parent: Element, emote: string) {
        this.element = elementFromString`<div class="horse"></div>`
        this.element.textContent = emote
        parent.appendChild(this.element)

        this.update()
    }

    private move(width: number, height: number) {
        if (!this.currentPosition) {
            return
        }

        let { x, y, xVel, yVel } = this.currentPosition
        if (!this.parent) {
            return
        }

        const w = width - 36
        const h = height - 36

        x += xVel
        y += yVel

        if (x >= w || x <= 0) {
            x -= xVel
            xVel = getInvertedSpeed(xVel)
        }

        if (y >= h || y <= 0) {
            y -= yVel
            yVel = getInvertedSpeed(yVel)
        }

        this.setPosition({ x, y, xVel, yVel })
        this.update()
    }

    private update() {
        if (!this.element || !this.currentPosition) {
            return
        }

        this.element.style.setProperty(
            "transform",
            `translate(${this.currentPosition.x}px, ${this.currentPosition.y}px)`
        )
    }
}

export default null
