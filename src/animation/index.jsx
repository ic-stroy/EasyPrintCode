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
                      delayChildren: 0.3,
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.2, delay: 0.25 }}
            >
                {props.children}
            </motion.div>
        </div>
    )
}

export default Reveal