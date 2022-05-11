const axios = require("axios")

async function fetchUserData(user) {
    const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/users?login=${user}`,
        headers: {
            Authorization: `Bearer ${process.env.TMI_ACCESS_TOKEN}`,
            "Client-Id": process.env.TMI_CLIENT_ID,
        },
    })
        .then((response) => {
            return response.data.data[0]
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return result
}

module.exports = { fetchUserData }
