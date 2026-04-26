import { useContext } from "react"
import Container from '../components/Container'
import { WatchListContext } from "../contexts/WatchLIstContext"
import MovieList from '../components/MovieList'
import styles from './WatchListPage.module.css'

function WatchListPage() {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist } = watchlistContext

    return <>
        <section className={styles.watchlistWrapper}>
            <Container>
                {watchlist.length <= 0
                    ? <h2>Your watchlist is empty</h2>
                    : <>
                        <h2 className={styles.title}>Your Watchlist</h2>
                        <MovieList movies={watchlist} variant={'remove'} />
                    </>}
            </Container>
        </section>
    </>
}

export default WatchListPage