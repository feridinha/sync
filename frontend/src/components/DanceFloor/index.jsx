import Avatar from "../Avatar"
import "./DanceFloor.css"

function DanceFloor({ avatars }) {
    return (
        <div className="dance-floor">
            {avatars.map((item) => (
                <Avatar key={item.uuid + item.position} avatar={item}/>
            ))}
        </div>
    )
}

export default DanceFloor
