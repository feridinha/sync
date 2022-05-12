import "./Queue.css"
import { FiExternalLink } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"

function Queue({ videos, loading }) {
    if (!videos) return
    const variants = {
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: 0.3,
            },
        }),
        hidden: { opacity: 0 },
    }
    return (
        <div className="queue-container">
            <AnimatePresence exitBeforeEnter={true}>
                {!loading &&
                    videos.map((item, index) => (
                        <motion.div
                            className="queue-item"
                            custom={index}
                            animate="visible"
                            initial="hidden"
                            exit="hidden"
                            variants={variants}
                            key={item.uuid}
                        >
                            {item.title}{" "}
                            <div
                                className="queue-item-author"
                                style={{ color: item.author.color }}
                            >
                                {item.author.name}
                            </div>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Abrir link"
                                href={"https://youtu.be/" + item.id}
                            >
                                <FiExternalLink style={{ cursor: "pointer" }} />
                            </a>
                        </motion.div>
                    ))}
            </AnimatePresence>
        </div>
    )
}

export default Queue
