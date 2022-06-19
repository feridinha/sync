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
        // Informa o vídeo tocando atualmente
        socket.on("info", (data) => {
            setVideo(data)
            player.setVideo(data)
            setLoading(false)
            console.log(data)   
        })

        // Muda o tempo do víde atual
        socket.on("seek", (data) => {
            player.seekTo(data)
        })

        // Remove o vídeo atual
        socket.on("skip", () => {
            setVideo(null)
            player.skipCurrent()
        })

        // Todos os vídeos na queue
        socket.on("queue", (data) => setQueue(data))

        // Skip all
        socket.on("reset-queue", () => {
            setQueue([])
            setVideo(null)
            player.skipCurrent()
        })

        // %avatar enter
        socket.on("new-avatar", (avatar) =>
            setAvatars((avatars) => [...avatars, avatar])
        )

        // %avatar move
        socket.on("update-avatar", (avatar) => {
            setAvatars((avatars) => [
                ...avatars.filter((i) => i.uuid !== avatar.uuid),
                avatar,
            ])
        })

        socket.on("remove-avatar", (avatar) => {
            setAvatars((avatars) => [
                ...avatars.filter((i) => i.uuid !== avatar.uuid)
            ])
        })
        
        // Todos os avatares
        socket.on("avatars", (data) => setAvatars(data))

        // Chamado quando a sala atual não existe, redireciona para Home
        socket.on("invalid-room", () => (window.location.href = "/"))

        // Chamado depois que a api confirma a existência da sala
        socket.on("ready", () => {
            console.log("ready")
            socket.emit("get-queue", roomName)
            socket.emit("get-avatars", roomName)
            socket.emit("get-info", roomName)
            document.title = "Sync - " + roomName
        })

        // Caso a sala exista, o servidor responderá com o evento "ready"
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

    const handleModal = () => setModal(!modal)

    return (
        <div className="App">
            {/* Modal */}
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {modal && (
                    <Modal handleClose={handleModal}>
                        <Help />
                    </Modal>
                )}
            </AnimatePresence>

            {/* Tela de carregamento */}
            {loading && <Loading />}

            <div className="container">
                <VideoPlayer
                    playerReady={() => socket.emit("get-info", roomName)}
                    queue={queue}
                />

                <Controls video={video} handleInput={handleInput} />

                {/* Só carrega depois que o websocket tiver sido iniciado */}
                {!loading && <DanceFloor avatars={avatars} />}
                {!loading && <Queue loading={loading} videos={queue} />}
            </div>
        </div>
    )
}

export default Room
