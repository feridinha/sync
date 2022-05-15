import { useEffect, useState } from "react"
import start from "../../services/socket"
const socket = start()
import { AnimatePresence } from "framer-motion"
import Help from "../Help"

import { VideoPlayer, player } from "../../components/VideoPlayer"
import Controls from "../../components/Controls"
import Queue from "../../components/Queue"
import DanceFloor from "../../components/DanceFloor"
import Loading from "../../components/Loading"
import Modal from "../../components/Modal"
import { useParams } from "react-router-dom"
import "../../App.css"
import "./Room.css"

function Room() {
    const [queue, setQueue] = useState([])
    const [avatars, setAvatars] = useState([])
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const { roomName } = useParams()

    useEffect(() => {
        socket.on("info", (data) => {
            setVideo(data)
            player.setVideo(data)
            setLoading(false)
        })

        socket.on("seek", (data) => {
            player.seekTo(data)
        })

        socket.on("skip", () => {
            setVideo(null)
            player.skipCurrent()
        })

        socket.on("queue", (data) => setQueue(data))

        socket.on("reset-queue", () => {
            setQueue([])
            setVideo(null)
            player.skipCurrent()
        })

        socket.on("new-avatar", (avatar) =>
            setAvatars((avatars) => [...avatars, avatar])
        )

        socket.on("update-avatar", (avatar) => {
            setAvatars((avatars) => [
                ...avatars.filter((i) => i.uuid !== avatar.uuid),
                avatar,
            ])
        })

        socket.on("avatars", (data) => setAvatars(data))

        socket.on("invalid-room", () => {
            window.location.href = "/"
        })

        socket.on("ready", async () => {
            console.log("ready")
            socket.emit("get-queue", roomName)
            socket.emit("get-avatars", roomName)
            socket.emit("get-info", roomName)
        })
        socket.emit("enter-room", roomName)
    }, [])

    const handleInput = (type) => {
        switch (type) {
            case "config":
                handleModal()
                break
            case "reload":
                socket.emit("get-info", roomName)
                break
        }
    }

    const handleModal = () => {
        setModal(!modal)
    }

    return (
        <div className="App">
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {modal && (
                    <Modal handleClose={handleModal}>
                        <Help />
                    </Modal>
                )}
            </AnimatePresence>
            {loading && <Loading />}
            <div className="container">
                <VideoPlayer
                    playerReady={() => socket.emit("get-info", roomName)}
                    video={video}
                    queue={queue}
                />
                <Controls video={video} handleInput={handleInput} />
                {!loading && <DanceFloor avatars={avatars} />}
                {!loading && <Queue loading={loading} videos={queue} />}
            </div>
        </div>
    )
}

export default Room
