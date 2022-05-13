require("dotenv").config()
const router = require("express").Router()
const axios = require("axios")
var rooms = require("../classes/rooms")

router.get("/", (req, res) => {
    console.log("Bateu endpoint")
    return res.json({ success: null })
})

router.get("/get-rooms", (req, res) => {
    let result = []
    let a = rooms.getRoomsArray()
    a.forEach((ta) => {
        result.push({
            room_name: ta.room_name,
            profile_image: ta.profile_image,
            display_name: ta.display_name,
            room_id: ta.room_id,

        })
    })
    res.send({ data: result })
})

module.exports = router
