const rooms = require("../classes/rooms")
const io = require("../services/io").io()

function voteSkip({ args, tags, cli, user }) {
    const socketAmout = io.sockets.adapter.rooms.get(tags.channel).size
    const votes = rooms[tags.channel].player.votes

    if (votes.includes(user.id)) return
    votes.push(user.id)
    if (getPercentage(votes.length, socketAmout) >= 70) {
        console.log("Coloquei um voto ", votes.length, socketAmout)
        rooms[tags.channel].player.skipCurrent()
    }
}

function getPercentage(votes, total) {
    if (total === 0) total = 1
    return (100 * votes) / total
}

module.exports = {
    name: "voteSkip",
    aliases: ["vote"],
    exec: voteSkip
}
