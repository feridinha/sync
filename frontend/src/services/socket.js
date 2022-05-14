import io from "socket.io-client"
const API_PATH = process.env.API_PATH;
const start = () => {
    const socket = io(API_PATH)
    return socket
}
export default start