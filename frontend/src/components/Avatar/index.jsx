import "./Avatar.css"
import TwitchBadge from "../TwitchBadge"
import { AnimatePresence, motion } from "framer-motion"

function Avatar({ avatar }) {
    const variants = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
            },
        },
        hidden: { opacity: 0 },
    }


    return (
        <motion.div
            className="avatar"
            style={{ left: `calc(${avatar.position}% - (115px / 2))` }}
            variants={variants}
            animate="visible"
            initial="hidden"
            exit="hidden"
        >
            <div className="avatar-owner" style={{color: avatar.user.color}}>
                <TwitchBadge user={avatar.user}></TwitchBadge>
                {avatar.user.name}
            </div>
            <div className="image-container ns">
                <img src={"https://feridinha.com" + avatar.image} />
            </div>
        </motion.div>
    )
}

export default Avatar
