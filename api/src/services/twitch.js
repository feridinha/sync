const axios = require("axios")

async function fetchUserImage(userId) {
    const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/users?id=${userId}`,
        headers: {
            Authorization: `Bearer ${process.env.TMI_ACCESS_TOKEN}`,
            "Client-Id": process.env.TMI_CLIENT_ID,
        },
    })
        .then((response) => {
            return response.data.data[0].profile_image_url
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    console.log(result)
    return result
}

module.exports = fetchUserImage
