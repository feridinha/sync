import { useEffect, useState } from "react"
import socket from "../../services/socket"

import { VideoPlayer, player } from "../../components/VideoPlayer"
import Controls from "../../components/Controls"
import Queue from "../../components/Queue"
import DanceFloor from "../../components/DanceFloor"
import Loading from "../../components/Loading"

import { useParams } from "react-router-dom"
import "../../App.css"
import "./Room.css"

function Room() {
    const [queue, setQueue] = useState([])
    const [avatars, setAvatars] = useState([])
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState({ loading: true })
    const { roomName } = useParams()

    useEffect(() => {
        socket.on("info", (data) => {
            setVideo(data)
            player.setVideo(data)
            setLoading({ loading: false })
        })

        socket.on("skip", () => {
            console.log("skiped")
            setVideo(null)
            player.skipCurrent()
        })

        socket.on("queue", (data) => setQueue(data))

        socket.on("new-avatar", (avatar) =>
            setAvatars((avatars) => [...avatars, avatar])
        )

        socket.on("update-avatar", (avatar) => {
            setAvatars((avatars) => [
                ...avatars.filter((i) => i.uuid !== avatar.uuid),
                avatar,
            ])
        })

        socket.on("invalid-room", () => setLoading({ loading: true, error: true }))
        socket.on("avatars", (data) => setAvatars(data))

        socket.emit("enter-room", roomName)
        socket.emit("get-queue")
        socket.emit("get-avatars")
    }, [])

    const handleInput = (type) => {
        switch (type){
            case "config":
                console.log("Modal config")
                break
            case "reload":
                socket.emit("get-info")
                break
        }
    }

    return (
        <div className="App">
            <Loading info={loading} />
            <div className="container">
                <VideoPlayer
                    playerReady={() => socket.emit("get-info")}
                />
                <Controls video={video} handleInput={handleInput} />
                <Queue loading={loading} videos={queue} />
                <DanceFloor avatars={avatars} />
            </div>
        </div>
    )
}

export default Room
