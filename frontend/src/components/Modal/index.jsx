import "./Modal.css"
import { MdClose } from "react-icons/md"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Backdrop"

function Modal({ handleClose, children }) {


    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                delay: 0.1,
                duration: 0.2,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <MdClose
                    className="close-modal"
                    onClick={handleClose}
                ></MdClose>
                {children}
            </motion.div>
        </Backdrop>
    )
}

export default Modal
