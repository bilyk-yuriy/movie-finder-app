import { useContext } from "react"
import Container from '../components/Container'
import { WatchListContext } from "../contexts/WatchLIstContext"
import styles from './WatchListPage.module.css'

function WatchListPage() {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist } = watchlistContext

    const BASE_URL = 'https://image.tmdb.org/t/p/'


    return <>
        <section className={styles.watchlistWrapper}>
            <Container>
                <h2 className={styles.title}>Your Watchlist</h2>
                {watchlist.map(el =>
                    <div className={styles.card} key={el.id}>
                        <img className={styles.poster} src={`${BASE_URL}w500${el.poster_path}`} alt="" />
                        <div>
                            <h3>{el.title}</h3>
                            <div>{el.release_date.slice(0, 4)}</div>
                            <div>{el.genres.map(g => g.name).join(', ')}</div>
                            <div> ✩ {el.vote_average}</div>
                            <div>{el.overview.slice(0, 50) + '...'}</div>
                            <button>Видалити з вотчліста</button>
                        </div>                        
                    </div>
                )}
            </Container>
        </section>
    </>
}

export default WatchListPage