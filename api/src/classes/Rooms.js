const VideoPlayer = require("./VideoPlayer")
const DanceFloor = require("./DanceFloor")
const { emitter: cb } = require("../handlers/events")
var rooms = {
    // akkaiverso: {
    //     username: "akkaiverso",
    //     user_id: "147070686",
    //     profile_image:
    //         "https://static-cdn.jtvnw.net/jtv_user_pictures/a886595f-8bf0-4273-823f-137c793d5c8d-profile_image-300x300.png",
    // },
    // ghiletofar: {
    //     username: "ghiletofar",
    //     user_id: "144746469",
    //     profile_image:
    //         "https://static-cdn.jtvnw.net/jtv_user_pictures/3aac8f3d-ac5e-4b17-8de4-5f9b4b14b235-profile_image-300x300.png",
    // },
    botirinho: {
        username: "botirinho",
        user_id: "746082502",
        profile_image:
            "https://static-cdn.jtvnw.net/jtv_user_pictures/292a5a64-b917-48c0-8d18-12020dcac088-profile_image-300x300.png",
    },
    getRoomsArray: function () {
        var result = []
        Object.keys(rooms).forEach((name) => {
            if (typeof rooms[name] === "function") return
            result.push(rooms[name])
        })
        return result
    },
    checkRoomExists: function (target) {
        return rooms
            .getRoomsArray()
            .map((i) => i.username)
            .includes(target)
    },
    createObjects: function () {
        Object.keys(rooms).forEach((roomName) => {
            if (typeof rooms[roomName] === "function") return
            rooms[roomName].player = new VideoPlayer(roomName, cb)
            rooms[roomName].danceFloor = new DanceFloor(roomName, cb)
        })
    },
}

module.exports = rooms
