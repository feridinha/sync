import "./TwitchBadge.css"

function TwitchBadge({ user }) {
    if (!user) return
    const imagePath = "https://f.feridinha.com/sync/badges"
    var badges = []

    if (user.dev || user.admin) badges.push(`staff.png`)
    if (user.vip) badges.push(`vip.png`)
    else if (user.mod) badges.push(`moderator.png`)
    else if (user.broadcaster) badges.push(`broadcaster.png`)
    return (
        <div className="twitch-badges">
            {badges.map((i) => (
                <img src={imagePath + "/" + i} alt="" key={i} />
            ))}
        </div>
    )
    // return badges.join("")
}

export default TwitchBadge
