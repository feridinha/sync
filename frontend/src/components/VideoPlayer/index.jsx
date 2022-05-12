import "./VideoPlayer.css"
import YouTube from "react-youtube"
import { useState } from "react"

export var player = {
    ref: {},
    setVideo: function (video) {
        this.ref.loadVideoById(
            video ? video.id : "",
            video?.time / 1000,
            "large"
        )
    },
    skipCurrent: function () {
        this.setVideo()
    },
}

export function VideoPlayer(props) {
    const [visible, setVisible] = useState(false)

    const _ready = (e) => {
        player.ref = e.target
        props.playerReady()
    }

    const _stateChanged = (e) => {
        if (e.data === -1) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const opts = {
        width: "100%",
        height: "100%",
        color: "white",
        playerVars: {
            autoplay: 1,
            mute: 1,
        },
    }

    return (
        <div className="video-player">
            <div
                className="no-video-playing ns"
                style={{
                    opacity: visible ? 1 : 0,
                    zIndex: visible ? 1 : -1,
                    transition: "0.1s",
                    transitionDelay: "1s",
                }}
            >
                <img src="https://f.feridinha.com/YRMse.webp" alt="" />
                Ninguém está tocando...
            </div>
            <YouTube
                className="video-wrapper"
                opts={opts}
                onReady={_ready}
                onStateChange={_stateChanged}
            />
        </div>
    )
}
