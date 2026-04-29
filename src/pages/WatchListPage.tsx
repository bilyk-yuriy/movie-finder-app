import { useState, useContext } from "react"
import Container from '../components/Container'
import { WatchListContext } from "../contexts/WatchListContext"
import MovieList from '../components/MovieList'
import CancelDeleteToast from "../components/CancelDeleteToast"
import type { MovieWithGenres } from "../types"
import styles from './WatchListPage.module.css'


function WatchListPage() {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist, toggleWatchList } = watchlistContext

    const [isToastVisible, setIsToastVisible] = useState(false)
    const [deletedMovie, setDeletedMovie] = useState<MovieWithGenres | null>(null)

    function showToast(movie: MovieWithGenres) {
        setIsToastVisible(true)
        setDeletedMovie(movie)
    }

    function restoreMovie(movie: MovieWithGenres) {
        toggleWatchList(movie)
    }

    function hideToast(){
        setIsToastVisible(false)
    }

    return <section className={styles.watchlistWrapper}>
        <Container>
            {watchlist.length <= 0
                ? <h2>Your watchlist is empty</h2>
                : <>
                    <h2 className={styles.title}>Your Watchlist</h2>
                    <MovieList movies={watchlist} variant={'remove'} showToast={showToast} />
                </>}
        </Container>
        {isToastVisible && deletedMovie !== null && <div className={styles.toast}><CancelDeleteToast movie={deletedMovie} restoreMovie={restoreMovie} hideToast={hideToast}/></div>}
    </section>
}

export default WatchListPage