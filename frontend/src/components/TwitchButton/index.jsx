import { useState } from "react"
import "./TwitchButton.css"

function TwitchButton() {
    const [url, setUrl] = useState(
        "https://id.twitch.tv/oauth2/authorize" +
            "?client_id=j34ksd9cpsjnl3dob50gwkodam9lvu" +
            "&redirect_uri=http://localhost:9999/login" +
            "&response_type=code"
    )

    return (
        <a className="twitch-button" href={url}>
            Fazer login
        </a>
    )
}

export default TwitchButton
