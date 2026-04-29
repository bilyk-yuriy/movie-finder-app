import { Link } from "react-router-dom"
import type { MovieWithGenres } from "../types"
import WatchlistBtn from "./WatchListBtn"
import styles from './MovieCard.module.css'

type MovieCardProp = {
    item: MovieWithGenres
    variant?: 'default' | 'remove'
    showToast?: (movie: MovieWithGenres)=> void
}

function MovieCard({ item, variant, showToast }: MovieCardProp) {

    const BASE_URL = 'https://image.tmdb.org/t/p/'

    const release = item.release_date.slice(0, 4)
    const genres = item.genres.join(', ')
    const rating = item.vote_average.toFixed(1)
    const description = item.overview.length > 100
        ? item.overview.substring(0, item.overview.lastIndexOf(' ', 100)) + '...'
        : item.overview

    return <div className={styles.card}>
            {<Link className={styles.link} to={`/movie/${item.id}`}>{item.poster_path ? <img className={styles.poster} src={`${BASE_URL}w500${item.poster_path}`} alt="" /> : <div className={styles.emptyPoster}>Фото відсутнє</div>}</Link>}
            <div>
                {<Link className={styles.link} to={`/movie/${item.id}`}><h3>{item.title}</h3></Link>}
                <div>{release}</div>
                {item.genres.length !== 0 && <div> • {genres} • </div>}
                {item.vote_average !== 0 && <div> ✩ {rating}</div>}
                <div>{description}</div>
                <WatchlistBtn movie={item} variant={variant} showToast={showToast}></WatchlistBtn>
            </div>
        </div>
    
}

export default MovieCard