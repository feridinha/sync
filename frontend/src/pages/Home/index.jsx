import axios from "axios"
import { useState, useEffect } from "react"
import RoomCard from "../../components/RoomCard"
import "./Home.css"

function Home() {
    const [rooms, setRoom] = useState([])

    const fetchRooms = async () => {
        const response = await axios
            .get("https://api.feridinha.com/get-rooms")
            .then((response) => {
                setRoom(response.data.data)
            })
            .catch((err) => {
                console.log(err)
                return []
            })
        return response
    }
    useEffect(() => {
        async function fetchData() {
            await fetchRooms()
        }
        fetchData()
    }, [])

    return (
        <div className="rooms">
            {rooms.map(item => (
                <RoomCard key={item.room_name} room={item}/>
            ))}
        </div>
    )
}

export default Home
