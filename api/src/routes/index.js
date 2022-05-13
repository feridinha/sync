require("dotenv").config()
const router = require("express").Router()
const axios = require("axios")
var rooms = require("../classes/rooms")

router.get("/", (req, res) => {
    console.log("Bateu endpoint")
    return res.json({ success: null })
})

router.get("/get-rooms", (req, res) => {
    res.send({data: rooms.getRoomsList()})
})

module.exports = router
