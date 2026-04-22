import { createContext, useState } from "react";
import type { Movie } from '../types'

type WatchListProviderProp = {
    watchlist: Movie[]
    addToWatchList: (movie: Movie) => void
}

export const WatchListContext = createContext<WatchListProviderProp | null>(null)

export function WatchListProvider( {children} : { children: React.ReactNode }) {
    
    const [watchlist, setWatchlist] = useState<Movie[]>([])

    function addToWatchList(movie: Movie) {
        setWatchlist([...watchlist, movie])
    }

    return <>
        <WatchListContext.Provider value={{watchlist, addToWatchList}} >
            {children}
        </WatchListContext.Provider>
    </>
}

