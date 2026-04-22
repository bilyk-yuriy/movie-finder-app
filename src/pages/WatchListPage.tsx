import { useContext } from "react"
import { WatchListContext } from "../contexts/WatchLIstContext"

function WatchListPage() {

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist } = watchlistContext

    return <>
        {watchlist.map(el =>
            <div key={el.id}>
                <div>{el.title}</div>
            </div>
        )}
    </>
}

export default WatchListPage