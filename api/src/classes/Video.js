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
        return this
    }

    shortTitle() {
        return this.title.length > 200
            ? this.title.substring(0, 170) + "..."
            : this.title
    }
}

module.exports = Video
