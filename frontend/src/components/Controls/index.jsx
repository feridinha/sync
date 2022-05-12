import "./Controls.css"
import TwitchBadge from "../TwitchBadge"

function Controls({ video, handleInput }) {
    return (
        <div className="controls">
            <h2 className="video-title">
                {video ? video.title : ""}
            </h2>
            <h4 className="video-author" style={{ color: video?.author.color }}>
                <TwitchBadge user={video?.author} />
                {video?.author.name}
            </h4>
            <div className="buttons">
                <button>
                    <img
                        onClick={() => handleInput("config")}
                        src="https://f.feridinha.com/sync/icons/config_.png"
                    ></img>
                </button>
                <button>
                    <img
                        onClick={() => handleInput("reload")}
                        src="https://f.feridinha.com/sync/icons/reload.png"
                    ></img>
                </button>
            </div>
        </div>
    )
}

export default Controls
