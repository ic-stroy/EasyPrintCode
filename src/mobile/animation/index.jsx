import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion';

function Reveal(props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        } else {
            ref.current.classList.remove('animate')
        }
    }, [isInView])

    return (
        <div ref={ref}>
            <motion.div
                variants={{
                    hidden: { opacity: 1, scale: 0 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delayChildren: 0.2,
                            staggerChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.1, delay: 0.05 }}
            >
                {props.children}
            </motion.div>
        </div>
    )
}

export default Reveal