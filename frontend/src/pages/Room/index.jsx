import { useEffect, useState } from "react"
import socket from "../../services/socket"

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
        console.log("dsfasdkfsdf")
        socket.on("info", (data) => {
            setVideo(data)
            player.setVideo(data)
            setLoading(false)
        })

        socket.on("seek", data => {
            player.seekTo(data)
        })

        socket.on("skip", () => {
            console.log("skiped")
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

        socket.on("invalid-room", async () => {
            setLoading(true)
            console.log("room inválida")
            await new Promise(r => setTimeout(r, 4000))
            socket.emit("get-ready")
        })

        socket.on("avatars", (data) => setAvatars(data))
        socket.on("ready", async () => {
            socket.emit("enter-room", roomName)
            socket.emit("get-queue")
            socket.emit("get-avatars")
            socket.emit("get-info")
        })
    }, [])

    const handleInput = (type) => {
        switch (type) {
            case "config":
                handleModal()
                break
            case "reload":
                socket.emit("get-info")
                break
        }
    }

    const handleModal = () => {
        document.body.style.overflow = modal ? "auto" : "hidden"
        setModal(!modal)
    }

    return (
        <div className="App">
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {modal && <Modal handleClose={handleModal}><Help></Help></Modal>}
            </AnimatePresence>
            {loading && <Loading />}
            <div className="container">
                <VideoPlayer playerReady={() => socket.emit("get-info")} />
                <Controls video={video} handleInput={handleInput} />
                {!loading && <DanceFloor avatars={avatars} />}
                {!loading && <Queue loading={loading} videos={queue} />}
            </div>
        </div>
    )
}

export default Room
