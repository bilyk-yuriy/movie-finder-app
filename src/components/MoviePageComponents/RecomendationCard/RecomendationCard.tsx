import { Link } from 'react-router-dom'
import type { Movie } from '../../../types'
import { BASE_URL_IMAGE } from '../../../constants'
import styles from './RecomendationCard.module.css'

type RecomendationCardProp = {
    recomendation: Movie
}

function RecomendationCard({ recomendation }: RecomendationCardProp) {

    return <Link to={`/movie/${recomendation.id}`}>
    <div className={styles.card}>
        {recomendation.poster_path ? <img className={styles.poster} src={`${BASE_URL_IMAGE}w500${recomendation.poster_path}`} alt="" /> : <div className={styles.emptyPoster}>photo is missing</div>}
        <div className={styles.title}>{recomendation.title}</div>
    </div>
    </Link>
}

export default RecomendationCard