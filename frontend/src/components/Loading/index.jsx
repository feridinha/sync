import "./Loading.css"

function Loading({ info }) {
    if (!info.loading) return

    return (
        <div className="loading-container">
            <img
                className={
                    info.error ? "loading-image-container error" : "loading-image-container"
                }
                src="/src/assets/loading.gif"
                alt=""
            />
        </div>
    )
}

export default Loading
