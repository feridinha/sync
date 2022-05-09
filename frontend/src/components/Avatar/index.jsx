import "./Avatar.css"
import TwitchBadge from "../TwitchBadge"
import { AnimatePresence, motion } from "framer-motion"

function Avatar({ avatar }) {
    const variants = {
        visible: {
            opacity: 1,
            bottom: "0px",
            transition: {
                delay: 0.5,
            },
        },
        hidden: { 
            bottom: "-140px",
            opacity: 0 
        },
    }

    return (
        <AnimatePresence exitBeforeEnter={true}>
            <motion.div
                className="avatar"
                style={{ left: `calc(${avatar.position}% - (115px / 2))` }}
                variants={variants}
                animate="visible"
                initial="hidden"
                exit="hidden"
            >
                <div
                    className="avatar-owner"
                    style={{ color: avatar.user.color }}
                >
                    <TwitchBadge user={avatar.user}></TwitchBadge>
                    {avatar.user.name}
                </div>
                <div className="image-container ns">
                    <img
                        src={
                            "https://f.feridinha.com/sync/avatars/" +
                            avatar.image
                        }
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Avatar
