const fetchVideoData = require("../services/youtube")
const { v4: uuidv4 } = require("uuid")

class Video {
    #startedTime
    #term

    constructor(term) {
        this.#term = term
    }

    async getInfo() {
        const result = await fetchVideoData(this.#term)
        if (!result) return false

        this.uuid = uuidv4()
        this.duration = result.duration
        this.title = result.title
        this.id = result.id
        return this

    }

    startPlaying() {
        if (this.#startedTime) return
        this.#startedTime = Date.now()
        this.time = 0
    }

    updateTime() {
        if (!this.#startedTime) this.startPlaying()
        this.time = Date.now() - this.#startedTime
        if (this.time < 0) {
            this.#startedTime = null
            this.startPlaying()
        }
        return this
    }

    seekTo(operator, seconds) {
        if (operator === "+") {
            this.#startedTime = this.#startedTime - seconds * 1000
            this.updateTime()
        } else if (operator === "-") {
            this.#startedTime = this.#startedTime + seconds * 1000
            this.updateTime()
        }
        return this
    }

    timeLeft() {
        return this.#startedTime + this.duration - Date.now()
    }

    shortTitle() {
        return this.title.length > 200
            ? this.title.substring(0, 170) + "..."
            : this.title
    }
}

module.exports = Video
