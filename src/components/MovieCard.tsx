import { Link } from "react-router-dom"
import type { MovieWithGenres } from "../types"
import WatchlistBtn from "./WatchListBtn"
import { BASE_URL_IMAGE } from "../constants"
import styles from './MovieCard.module.css'

type MovieCardProp = {
    item: MovieWithGenres
    variant?: 'default' | 'remove'
    showToast?: (movie: MovieWithGenres) => void
    currentPage?: number
    showIndex?: number
}

function MovieCard({ item, variant, showToast, currentPage, showIndex }: MovieCardProp) {

    const release = item.release_date.slice(0, 4)
    const genres = item.genres.join(', ')
    const rating = item.vote_average.toFixed(1)
    const description = item.overview.length > 100
        ? item.overview.substring(0, item.overview.lastIndexOf(' ', 100)) + '...'
        : item.overview

    return <div className={styles.card}>
        {showIndex !== undefined && currentPage && <span>{showIndex + 1 + (currentPage - 1) * 20}</span>}
        {<Link to={`/movie/${item.id}`}>{item.poster_path
            ? <img className={styles.poster} src={`${BASE_URL_IMAGE}w500${item.poster_path}`} alt="" />
            : <div className={styles.emptyPoster}>Фото відсутнє</div>}</Link>}
        <div className={styles.info}>
            {<Link to={`/movie/${item.id}`}><h3>{item.title}</h3></Link>}
            <div>{release}</div>
            {item.genres.length !== 0 && <div> • {genres} • </div>}
            {item.vote_average !== 0 && <div> ✩ {rating}</div>}
            <div>{description}</div>
            <WatchlistBtn movie={item} variant={variant} showToast={showToast}></WatchlistBtn>
        </div>
    </div>

}

export default MovieCard