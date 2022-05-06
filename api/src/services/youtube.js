require("dotenv").config()
const axios = require("axios")
const getVideoId = require("get-video-id")

function convertISO8601ToMs(duration) {
    const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i
    const extracted = time_extractor.exec(duration)
    if (extracted) {
        const days = parseInt(extracted[1], 10) || 0
        const hours = parseInt(extracted[2], 10) || 0
        const minutes = parseInt(extracted[3], 10) || 0
        const seconds = parseInt(extracted[4], 10) || 0
        return (
            days * 24 * 3600 * 1000 +
            hours * 3600 * 1000 +
            minutes * 60 * 1000 +
            seconds * 1000
        )
    }
    return 0
}

function getVideoData(url) {
    data = getVideoId(url)
    if (!data.id || !data.service) {
        return false
    } else if (data.service == "youtube") {
        return data.id
    }
    return false
}

async function getVideoDuration(id) {
    if (!id) {
        return false
    }
    url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=contentDetails,snippet&id=${id}`

    const response = await axios
        .get(url)
        .then((res) => {
            try {
                console.log(res.data.items[0].snippet.title)
                duration = res.data.items[0].contentDetails.duration
                title = res.data.items[0].snippet.title
                duration = convertISO8601ToMs(duration)
                return { duration, title }
            } catch (err) {
                return false
            }
        })
        .catch((err) => {
            return false
        })
    return response
}

module.exports = { getVideoDuration, getVideoData }
