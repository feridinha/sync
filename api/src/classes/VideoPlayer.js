class VideoPlayer {
    constructor(room, callback) {
        this.queue = []
        this.votes = []
        this.room = room
        this.callback = callback
    }

    playOne() {
        if (this.queue.length < 1) return false //Nenhum vídeo na queue
        this.current = this.queue[0]
        this.current.startPlaying()
        this.timeout = setTimeout(
            this.skipCurrent.bind(this),
            this.current.duration
        )
        this.callback.emit("ws-inform-room", this.room, ["info", this.current])
    }

    skipCurrent() {
        this.votes = []
        this.current = null
        clearTimeout(this.timeout)
        this.queue.shift()
        this.callback.emit("ws-inform-room", this.room, ["skip"])
        this.callback.emit("ws-inform-room", this.room, ["queue", this.queue])
        this.playOne()
    }

    resetQueue() {
        clearTimeout(this.timeout)
        this.timeout = null
        this.queue = []
        this.current = null
        console.log("[Player]: Resetei a lista")
        this.callback.emit("ws-inform-room", this.room, ["reset-queue"])
        this.update()
    }

    addOne(video) {
        this.queue.push(video)
        this.callback.emit("ws-inform-room", this.room, ["queue", this.queue])
        this.update()
    }

    removeById(id) {
        if (id === this.current.uuid) return this.skipCurrent()
        this.queue = this.queue.filter((item) => item.uuid !== id)
        this.callback.emit("ws-inform-room", this.room, ["queue", this.queue])
    }

    seekTo(operator, seconds) {
        const result = this.current.seekTo(operator, seconds)
        if (!result) return console.log("[Player]: Seek retornou erro...")
        clearTimeout(this.timeout)
        this.timeout = setTimeout(
            this.skipCurrent.bind(this),
            this.current.timeLeft()
        )
        this.callback.emit("ws-inform-room", this.room, ["seek", this.current])
    }

    update() {
        if (!this.current && this.queue.length > 0) {
            console.log("[Player]: Novo vídeo tocando")
            this.playOne()
        }
    }
}

module.exports = VideoPlayer
