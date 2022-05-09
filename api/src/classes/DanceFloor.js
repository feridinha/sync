class DanceFloor {
    constructor(room, callback) {
        this.room = room
        this.callback = callback
        this.avatars = []
    }

    addAvatar(avatar) {
        // Avatar model
        if (this.avatars.map((i) => i.user.id).includes(avatar.user.id))
            return false
        this.avatars.push(avatar)
        this.callback.emit("ws-inform-room", this.room, ["new-avatar", avatar])
        return this
    }

    moveAvatar(avatar) {
        // User model
        avatar.createPosition()
        this.callback.emit("ws-inform-room", this.room, [
            "update-avatar",
            avatar,
        ])
        return this
    }
}

module.exports = DanceFloor
