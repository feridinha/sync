const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const routes = require("./routes")
const server = require("http").createServer(app)

// Initialize
const io = require("./services/io").initialize(server)
const client = require("./services/tmi")
const events = require("./handlers/events").initialize(io, client)
const rooms = require("./classes/rooms")

// Handlers
const handleSocket = require("./handlers/socket")
const handleCommand = require("./handlers/command")

// Routes && Events
app.use("/", routes)
io.on("connection", handleSocket.connnection)

client.on("connected", () => { rooms.initialize(events.emitter) })
client.on("message", (c, t, m, s) => handleCommand(c, t, m, s, client))

server.listen(9999)
