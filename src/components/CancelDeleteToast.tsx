import { useState, useEffect } from "react"
import type { MovieWithGenres } from "../types"
import styles from './CancelDeleteToast.module.css'

type CancelDeleteToastProp = {
    movie: MovieWithGenres
    restoreMovie: (movie: MovieWithGenres) => void
    hideToast: () => void
}

function CancelDeleteToast({ movie, restoreMovie, hideToast }: CancelDeleteToastProp) {

    const [seconds, setSeconds] = useState(5)

    useEffect(() => {
        setSeconds(5)
        const timer = setInterval(() => {
            setSeconds(prev => {
                if (prev === 1) {
                    clearInterval(timer)
                    hideToast()
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [movie])

    return <>
        <div className={styles.cancelToastContainer}>
            <svg key={movie.id} className={styles.ring} viewBox="0 0 34 34">
                <circle className={styles.ringBg} cx="17" cy="17" r="14" />
                <circle className={styles.ringFill} cx="17" cy="17" r="14" />
            </svg>
            <div className={styles.seconds}>{seconds}</div>
            <span className={styles.title}>{movie.title}: was deleted from watchlist</span>
            <button className={styles.cancelBtn} onClick={() => { hideToast(); restoreMovie(movie) }}>Cancel</button>
        </div>
    </>
}

export default CancelDeleteToast