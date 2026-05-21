import { Link } from "react-router-dom";
import type { MoviePreview, MovieWithGenres } from "../types"
import SectionCard from "./SectionCard"
import ScrollBtn from './ScrollBtn';
import useListRef from '../hooks/useListRef';
import WatchlistBtn from "./WatchListBtn";
import useFetchGenres from "../hooks/useFetchGenres";
import { BASE_YTUBE_URL } from '../constants'
import styles from './SectionList.module.css'

type CardListProp = {
    movies: MoviePreview[]
    upcoming?: boolean
    trending?: boolean
    trailer?: string | undefined
    timeWindow?: 'week' | 'day'
}

function CardList({ movies, upcoming, trending, trailer, timeWindow }: CardListProp) {

    const { listRef, atStart, atEnd, scrollList } = useListRef(movies, 4)

    const { data: genresData, isLoading } = useFetchGenres()

    const movie: MovieWithGenres = { ...movies[0], genres: genresData?.genres.filter(g => movies[0].genre_ids.includes(g.id)).map(g=> g.name) ?? []}

    return <>
        <div className={styles.wrapper}>
            {movies.length > 5 && !atStart && <ScrollBtn type={'left'} scrollList={() => scrollList('left')} />}
            {movies.length > 5 && !atEnd && <ScrollBtn type={'right'} scrollList={() => scrollList('right')} />}
            <div className={styles.cardList} ref={listRef}>
                {trending && trailer && <div className={styles.trailerContainer}>
                    <Link to={`/movie/${movie.id}`}><div className={styles.trailer}>
                        <iframe src={`${BASE_YTUBE_URL}${trailer}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailer}`} />
                    </div></Link>
                    <div className={styles.info}>
                        <span>#1 THIS {timeWindow?.toUpperCase()}</span>
                        <WatchlistBtn movie={movie} disabled={isLoading}/>
                        <Link to={`/movie/${movie.id}`}><span className={styles.showMore}>SHOW MORE</span></Link>
                    </div>
                </div>}
                {movies.map(el =>
                    <SectionCard key={el.id} item={el} upcoming={upcoming} />
                )}
            </div>
        </div>
    </>
}

export default CardList