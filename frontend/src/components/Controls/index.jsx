import "./Controls.css"
import TwitchBadge from "../TwitchBadge"
import ReactTooltip from "react-tooltip"

function Controls({ video, handleInput }) {
    return (
        <div className="controls">
            <h2 className="video-title">{video ? video.title : ""}</h2>
            <h4 className="video-author" style={{ color: video?.author.color }}>
                <TwitchBadge user={video?.author} toolTipId="current-author" />
                {video?.author.name}
                <ReactTooltip
                    border={true}
                    borderColor="#bd93f9"
                    className="tooltip"
                    place="top"
                    effect="solid"
                    id="current-author"
                />
            </h4>
            <div className="buttons">
                <button>
                    <p data-tip="Configurações" data-for="controls">
                        <img
                            draggable={false}
                            onClick={() => handleInput("config")}
                            src="https://f.feridinha.com/sync/icons/config_.png"
                        />
                    </p>
                </button>
                <button>
                    <p data-tip="Sincronizar" data-for="controls">
                        <img
                            draggable={false}
                            onClick={() => handleInput("reload")}
                            src="https://f.feridinha.com/sync/icons/reload.png"
                        />
                    </p>
                </button>
            </div>
            <ReactTooltip
                border={true}
                borderColor="#ff79c6"
                className="tooltip"
                place="bottom"
                effect="solid"
                id="controls"
            />
        </div>
    )
}

export default Controls
