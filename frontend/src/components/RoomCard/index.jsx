import {useRef} from "react"
import { animated } from "react-spring"
import { use3dEffect } from "use-3d-effect"
import "./RoomCard.css"

function RoomCard({ room }) {
    const ref = useRef(null)
    const { style, ...mouseHandlers } = use3dEffect(ref)
    return (
        <animated.div
            ref={ref}
            style={{
                ...style
            }}
            {...mouseHandlers}
            className="room-card"
            key={room.user_id}
        >
            <img
                className="room-image"
                src={room.profile_image}
            />
            <h3>{room.username}</h3>
            <a href={`/${room.username}`} className="open-room-button">
                Acessar
            </a>
        </animated.div>
    )
}

export default RoomCard
