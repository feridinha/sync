import "./DanceFloor.css"

function DanceFloor({ avatars }) {
    return (
        <div className="dance-floor">
            {avatars.map((item) => (
                <div
                    className="avatar ns"
                    style={{ left: `calc(${item.position}% - (115px / 2))` }}
                    key={item.uuid}
                >
                    <div className="image-container">
                        <img src={"https://feridinha.com" + item.image} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DanceFloor
