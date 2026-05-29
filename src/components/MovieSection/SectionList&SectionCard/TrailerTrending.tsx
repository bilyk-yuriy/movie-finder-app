import { Link } from 'react-router-dom'
import WatchlistBtn from '../../WatchListBtn'
import { BASE_YTUBE_URL } from '../../../constants'
import type { MovieWithGenres } from '../../../types'
import styles from './TrailerTrending.module.css'

type TrailerTrendingProp = {
    movie: MovieWithGenres,
    trailer: string,
    timeWindow: 'week' | 'day' | undefined,
    isLoading: boolean
}

function TrailerTrending({ movie, trailer, timeWindow, isLoading }: TrailerTrendingProp) {

    return <div className={styles.trailerContainer}>
        <Link to={`/movie/${movie.id}`}><div className={styles.trailer}>
            <iframe src={`${BASE_YTUBE_URL}${trailer}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailer}`} />
        </div></Link>
        <div className={styles.info}>
            <span>#1 THIS {timeWindow?.toUpperCase()}</span>
            <WatchlistBtn movie={movie} disabled={isLoading} />
            <Link to={`/movie/${movie.id}`}><span>SHOW MORE</span></Link>
        </div>
    </div>
}

export default TrailerTrending