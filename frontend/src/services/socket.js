import io from "socket.io-client"
const API_PATH = process.env.API_PATH;
const socket = io(API_PATH)
export default socket