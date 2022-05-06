const { getVideoDuration, getVideoData } = require("../services/youtube")
const { v4: uuidv4 } = require("uuid")

class Video {
    #startedTime

    constructor(url) {
        this.id = getVideoData(url)
    }

    async getInfo() {
        const result = await getVideoDuration(this.id)
        if (result) {
            this.uuid = uuidv4()
            this.duration = result.duration
            this.title = result.title
            return true
        }
        return false
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
            ? this.title.substr(0, 170) + "..."
            : this.title
    }

    getUtilData(){
        
    }
}

module.exports = Video
