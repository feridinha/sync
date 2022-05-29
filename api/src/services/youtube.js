require("dotenv").config()
const { YouTube } = require('popyt')
const youtube = new YouTube(process.env.YOUTUBE_API_KEY)

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
    throw new Error("Não foi possível converter ISO8601 para Ms")
}

async function fetchVideoData(v) {
    try {
        const video = await youtube.getVideo(v)
        return {
            title: video.title,
            duration: convertISO8601ToMs(video.data.contentDetails.duration),
            id: video.id
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

async function fetchPlaylistItems(v) {
    const result = await youtube.getPlaylistItems(v, part)
    // result.map(i => i.data.contentDetails.duration = convertISO8601ToMs(i.data.contentDetails.duration))
    result.forEach(i => console.log(i.data))
    return result
}


const test = async () => {
    const video = await fetchPlaylistItems('PLgYcYpivCy-ebuQWcqLZ7Ku_QkWn1b5B1')
    // console.log(video)
}



module.exports = fetchVideoData