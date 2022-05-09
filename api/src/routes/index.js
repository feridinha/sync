require("dotenv").config()
const router = require("express").Router()
const axios = require("axios")
var rooms = require("../classes/Rooms")

router.get("/", (req, res) => {
    console.log("Bateu endpoint")
    return res.json({ success: null })
})

async function handleAuth(code) {
    const response = await axios({
        method: "post",
        url: `https://id.twitch.tv/oauth2/token`,
        data: {
            client_id: process.env.APP_CLIENT_ID,
            client_secret: process.env.APP_SECRET,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:9999/login",
        },
    })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log("[Error Login]: ", err)
            return false
        })
    return response
}

async function fetchTokenData({ access_token }) {
    const response = await axios({
        method: "get",
        url: "https://id.twitch.tv/oauth2/validate",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log("[Error handle auth]: ", err)
            return false
        })
    return response
}

router.get("/login", async (req, res) => {
    const code = req.query.code
    if (!code || req.query.error || req.query.error_description) {
        return res.send({ success: false }).status(400)
    }
    const userAuth = await handleAuth(code)
    if (!userAuth)
        return res.send({ success: false }).status(400)
    const userData = await fetchTokenData(userAuth)
    return res.send({ success: true }).status(200)
})

router.get("/get-rooms", (req, res) => {
    res.send({data: rooms.getRoomsArray()})
})

module.exports = router
