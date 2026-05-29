import { useNavigate } from "react-router-dom";
import type { MoviePreview, MovieWithGenres } from "../../../types"
import SectionCard from "./SectionCard"
import ScrollBtn from '../../ScrollBtn';
import useListRef from '../../../hooks/useListRef';
import useFetchGenres from "../../../hooks/useFetchGenres";
import TrailerTrending from "./TrailerTrending";
import ShowAllBtn from "./ShowAllBtn";
import styles from './SectionList.module.css'

type CardListProp = {
    movies: MoviePreview[]
    category: 'trending' | 'popular' | 'upcoming' | 'top'
    trailer?: string | undefined
    timeWindow?: 'week' | 'day'
}

function CardList({ movies, category, trailer, timeWindow }: CardListProp) {

    const { listRef, atStart, atEnd, scrollList } = useListRef(movies, 4)

    const { data: genresData, isLoading } = useFetchGenres()

    const navigate = useNavigate()

    const routes: Record<string, string> = {
        popular: 'all-movie?category=popular&page=1',
        upcoming: 'all-movie?category=upcoming&page=1',
        top: 'all-movie?category=top500&page=1',
    }

    function handleNavigate() {
        if (routes[category]) navigate(routes[category])
    }
 
    const movie: MovieWithGenres = { ...movies[0], genres: genresData?.genres.filter(g => movies[0].genre_ids.includes(g.id)).map(g => g.name) ?? [] }

    return <div className={styles.wrapper}>
        {movies.length > 5 && !atStart && <ScrollBtn type={'left'} scrollList={() => scrollList('left')} />}
        {movies.length > 5 && !atEnd && <ScrollBtn type={'right'} scrollList={() => scrollList('right')} />}
        <div className={styles.cardList} ref={listRef}>
            {category === 'trending' && trailer && <TrailerTrending movie={movie} trailer={trailer} timeWindow={timeWindow} isLoading={isLoading}/>}
            {movies.map(el =>
                <SectionCard key={el.id} item={el} upcoming={category === 'upcoming'} />
            )}
            {!trailer && <ShowAllBtn handleNavigate={handleNavigate}/>}
        </div>
    </div>
}

export default CardList