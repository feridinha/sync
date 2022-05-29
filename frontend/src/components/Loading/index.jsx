import "./Loading.css"

function Loading() {
    return (
        <div className="loading-container">
            <img
                draggable={false}
                className="loading-image-container"
                src="https://f.feridinha.com/sync/logo.gif"
                alt=""
            />
        </div>
    )
}

export default Loading
