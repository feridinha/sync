import { Routes, Route } from "react-router-dom"
import Room from "./pages/Room"
import Home from "./pages/Home"

function App() {
    return (
        <Routes>
            <Route path="/:roomName" element={<Room />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default App
