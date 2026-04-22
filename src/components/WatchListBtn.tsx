import { useContext } from "react";
import { MdBookmarkAdd } from "react-icons/md";
import { WatchListContext } from "../contexts/WatchLIstContext";
import styles from './WatchListBtn.module.css'
import type { Movie } from "../types";

type WatchListProp = {
    movie: Movie
}

function WatchlistBtn({movie}: WatchListProp) {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { addToWatchList } = watchlistContext

    return <>
        <button onClick={()=> addToWatchList(movie)} className={styles.addWatchlistBtn}><MdBookmarkAdd /> Add to Watchlist</button>
    </>
}

export default WatchlistBtn