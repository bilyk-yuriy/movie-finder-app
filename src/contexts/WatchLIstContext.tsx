import { createContext, useState } from "react";
import type { MovieWithGenres } from '../types'

type WatchListProviderProp = {
    watchlist: MovieWithGenres[]
    toggleWatchList: (movie: MovieWithGenres) => void
}

export const WatchListContext = createContext<WatchListProviderProp | null>(null)

export function WatchListProvider( {children} : { children: React.ReactNode }) {
    
    const [watchlist, setWatchlist] = useState<MovieWithGenres[]>([])

    function toggleWatchList(movie: MovieWithGenres) {
        const found = watchlist.find(el => el.id === movie.id)
        found ? setWatchlist(watchlist.filter(el => el.id !== movie.id)) : setWatchlist([...watchlist, movie])
    }

    return <>
        <WatchListContext.Provider value={{watchlist, toggleWatchList}} >
            {children}
        </WatchListContext.Provider>
    </>
}

