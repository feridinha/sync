import Tilty from 'react-tilty';
import "./RoomCard.css"

function RoomCard({ room }) {
    return (
        <Tilty
            className="room-card"
            key={room.room_id}
            scale={1.1}
            perspective={350}
            max={15}
            speed={3000}
            reverse={true}
        >
            <img className="room-image" src={room.profile_image} />
            <h3>{room.display_name}</h3>
            <a href={`/${room.room_name}`} className="open-room-button">
                Acessar
            </a>
        </Tilty>
    )
}

export default RoomCard
