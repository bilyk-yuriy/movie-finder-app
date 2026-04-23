import { Link } from 'react-router-dom'
import type { MoviePreview } from "../types"
import styles from './CardItem.module.css'

type CardItemProp = {
    item: MoviePreview
}

function CartItem({ item }: CardItemProp) {

    const year = item.release_date.slice(0, 4)
    const rating = item.vote_average.toFixed(1)

    return <Link to={`/movie/${item.id}`}>
        <div className={styles.card}>
            <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
            <div className={styles.cardInfo}>
                <h4>{item.title}</h4>
                <div className={styles.description}>
                    <span>{year}</span>
                    {item.vote_average > 0 && <span> • ✩ {rating}</span>}
                </div>
            </div>
        </div>
    </Link>
}

export default CartItem