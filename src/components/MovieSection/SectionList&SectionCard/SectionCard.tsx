import { Link } from 'react-router-dom'
import type { MoviePreview } from '../../../types'
import styles from './SectionCard.module.css'

type CardItemProp = {
    item: MoviePreview
    upcoming?: boolean
}

function CartItem({ item, upcoming }: CardItemProp) {

    const year = item.release_date.slice(0, 4)
    const nextYear = Number(year) < Number(item.release_date.slice(0, 4)) ? item.release_date.slice(0, 4) : ''
    const formatReleaseDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-')
        const date = new Date(Number(year), Number(month) - 1, Number(day))
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric'})
    }
    const coming = `Coming ${nextYear} ${formatReleaseDate(item.release_date)}`
    const rating = ` • ✩ ${item.vote_average.toFixed(1)}`

    return <Link to={`/movie/${item.id}`}>
        <div className={styles.card}>
            <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
            <div className={styles.cardInfo}>
                <h4 className={styles.title} >{item.title}</h4>
                <div className={styles.description}>
                    {!upcoming && <span>{year}</span>}
                    {upcoming && <span>{coming}</span>}
                    {item.vote_average > 0 && item.vote_count >= 30 && <span>{rating}</span>}
                </div>
            </div>
        </div>
    </Link>
}

export default CartItem