import { useContext } from "react";
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import type { MovieWithGenres } from "../types";
import { WatchListContext } from '../contexts/WatchListContext';
import styles from './WatchListBtn.module.css'

type WatchListProp = {
    movie: MovieWithGenres
    variant?: 'default' | 'remove'
}

function WatchlistBtn({movie, variant}: WatchListProp) {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist, toggleWatchList } = watchlistContext

    const found = watchlist.find(el => el.id === movie.id)

    if (variant === 'remove') {
        return <button onClick={()=> toggleWatchList(movie)} className={styles.removeBtn}>
            <FaTrashAlt /> Remove
        </button>
    } 

    return <>
        {found
        ? <button onClick={()=> toggleWatchList(movie)} className={styles.addedBtn}><MdBookmarkAdded />Added</button>
        : <button onClick={()=> toggleWatchList(movie)} className={styles.addBtn}><MdBookmarkAdd />Add to Watchlist</button>}
    </>
}

export default WatchlistBtn