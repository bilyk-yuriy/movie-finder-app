import { createContext, useState } from "react";
import type { Movie } from '../types'

type WatchListProviderProp = {
    watchlist: Movie[]
    toggleWatchList: (movie: Movie) => void
}

export const WatchListContext = createContext<WatchListProviderProp | null>(null)

export function WatchListProvider( {children} : { children: React.ReactNode }) {
    
    const [watchlist, setWatchlist] = useState<Movie[]>([])

    function toggleWatchList(movie: Movie) {
        const found = watchlist.find(el => el.id === movie.id)
        found ? setWatchlist(watchlist.filter(el => el.id !== movie.id)) : setWatchlist([...watchlist, movie])
    }

    return <>
        <WatchListContext.Provider value={{watchlist, toggleWatchList}} >
            {children}
        </WatchListContext.Provider>
    </>
}

