import axios from "axios"
import { useState, useEffect } from "react"
import RoomCard from "../../components/RoomCard"
import "./Home.css"

const API_PATH = process.env.API_PATH;
function Home() {
    const [rooms, setRoom] = useState([])

    const fetchRooms = async () => {
        const response = await axios
            .get(`${API_PATH}/get-rooms`)
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
