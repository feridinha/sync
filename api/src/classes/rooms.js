const VideoPlayer = require("./VideoPlayer")
const DanceFloor = require("./DanceFloor")
const RoomModel = require("../models/Room")

var rooms = {
    getRoomsArray: function () {
        var result = []
        Object.keys(this).forEach((name) => {
            if (typeof this[name] === "function") return
            result.push(this[name])
        })
        return result
    },

    checkRoomExists: function (target) {
        return this.getRoomsArray()
            .map((i) => i.room_name)
            .includes(target)
    },

    createFromDatabase: async function () {
        const search = await RoomModel.find()
        search.forEach((s) => {
            if (this[s.room_name]?.player) return // Já foi criada
            this[s.room_name] = {}
            Object.assign(this[s.room_name], s._doc)
        })
        return true
    },

    createClasses: function (cb) {
        Object.keys(this).forEach((roomName) => {
            if (typeof this[roomName] === "function") return
            if (this[roomName].player) return // Já foi criada
            this[roomName].player = new VideoPlayer(roomName, cb)
            this[roomName].danceFloor = new DanceFloor(roomName, cb)
        })
    },

    configCallback: function (callback) {
        callback.on("dance-floor-timeout-start", (roomName) => {
            this[roomName].danceFloor.setTimeoutLoop()
        })

        callback.on("dance-floor-timeout-stop", (roomName) => {
            this[roomName].danceFloor.stopTimeoutLoop()
        })
        return callback
    },

    initialize: async function (callback) {
        callback = this.configCallback(callback)
        await this.createFromDatabase()
        this.createClasses(callback)
        this.getRoomsArray().forEach((i) =>
            callback.emit("tmi-join-channel", i.room_name)
        )
    },

    deleteOne: function (roomName) {
        delete this[roomName]
    },

    update: async function () {
        await this.createFromDatabase()
    },
}

module.exports = rooms
