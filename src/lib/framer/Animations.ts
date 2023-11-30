export const fadeRiseAnimation = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.3
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {
            duration: 0.3,
        }
    }
}