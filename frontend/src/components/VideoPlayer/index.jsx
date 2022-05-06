import "./VideoPlayer.css"
import YouTube from "react-youtube"

export var player = {
    ref: {},
    setVideo: function(video) {
        // if(!video) return this.ref.clearVideo()
        this.ref.loadVideoById(
            video ? video.id : "",
            video?.time / 1000,
            "large"
        )
    },
    skipCurrent: function(){
        this.setVideo()
    }
}

export function VideoPlayer(props) {
    const _ready = (e) => {
        player.ref = e.target
        props.playerReady()
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
            <YouTube className="video-wrapper" opts={opts} onReady={_ready} />
        </div>
    )
}


