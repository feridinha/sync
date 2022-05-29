class DanceFloor {
    constructor(room, callback) {
        this.room = room
        this.callback = callback
        this.avatars = []
        this.timeout = null
    }

    addAvatar(avatar) {
        if (this.avatars.map((i) => i.user.id).includes(avatar.user.id))
            return false
        this.avatars.push(avatar)
        this.callback.emit("ws-inform-room", this.room, ["new-avatar", avatar])
        return this
    }

    updateAvatar(avatar) {
        this.callback.emit("ws-inform-room", this.room, [
            "update-avatar",
            avatar,
        ])
        return this
    }

    removeAvatar(avatar) {
        this.avatars = this.avatars.filter((i) => i.user.id !== avatar.user.id)
        this.callback.emit("ws-inform-room", this.room, [
            "remove-avatar",
            avatar,
        ])
    }

    resetAvatars() {
        this.avatars = []
        console.log("resetei avatars")
        this.callback.emit("ws-inform-room", this.room, [
            "avatars",
            this.avatars,
        ])
    }

    stopTimeoutLoop() {
        clearTimeout(this.timeout)
        this.timeout = null
        console.log("Tirei timeout")
    }

    setTimeoutLoop() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.resetAvatars.bind(this), 30 * 60 * 1000)
        console.log("Setei novo timeout") // 30 minutos
    }
}

module.exports = DanceFloor
