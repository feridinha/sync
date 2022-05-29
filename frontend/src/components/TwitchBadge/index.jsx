import "./TwitchBadge.css"
import ReactTooltip from "react-tooltip"

function TwitchBadge({ user, toolTipId }) {
    ReactTooltip.rebuild()
    if (!user) return
    const imagePath = "https://f.feridinha.com/sync/badges"
    var badges = []

    if (user.dev || user.admin)
        badges.push({ file: `staff.png`, tooltip: "Developer" })

    if (user.vip) badges.push({ file: `vip.png`, tooltip: "Vip" })
    else if (user.mod)
        badges.push({ file: `moderator.png`, tooltip: "Moderator" })
    else if (user.broadcaster)
        badges.push({ file: `broadcaster.png`, tooltip: "Broadcaster" })

    if (user.dj) badges.push({ file: `dj.png`, tooltip: "Channel dj" })

    return (
        <div className="twitch-badges">
            {badges.map((i, x) => (
                <p
                    data-tip={i.tooltip}
                    key={x + i.file + user.uuid}
                    data-for={toolTipId}
                >
                    <img
                        draggable={false}
                        src={imagePath + "/" + i.file}
                        alt=""
                        key={i}
                    />
                </p>
            ))}
        </div>
    )
}

export default TwitchBadge
