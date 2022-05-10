const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const routes = require("./routes")
const server = require("http").createServer(app)
const client = require("./services/tmi")
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

require("./handlers/events").config(io, client)
require("./classes/rooms").createObjects()

app.use("/", routes)

const handleSocket = require("./handlers/socket")
io.on("connection", handleSocket.connnection)

server.listen(9999)
module.exports = io
