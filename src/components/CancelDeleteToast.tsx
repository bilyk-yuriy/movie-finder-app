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
            <div className={styles.title}>{movie.title}</div>
            <div>was deleted from watchlist</div>
            <button onClick={() => { hideToast(); restoreMovie(movie) }}>cancel</button>
            <div>({seconds})</div>
        </div>
    </>
}

export default CancelDeleteToast