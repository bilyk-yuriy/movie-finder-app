import type { MoviePreview } from "../types"
import SectionCard from "./SectionCard"
import ScrollBtn from './ScrollBtn';
import useListRef from '../hooks/useListRef';
import styles from './SectionList.module.css'

type CardListProp = {
    movies: MoviePreview[]
}

function CardList({ movies }: CardListProp) {

    const {listRef, atStart, atEnd, scrollList} = useListRef(movies, 4)

    return <>
        <div className={styles.wrapper}> 
            {movies.length > 5 && !atStart && <ScrollBtn type={'left'} scrollList={()=> scrollList('left')}/>}
            {movies.length > 5 && !atEnd && <ScrollBtn type={'right'} scrollList={()=> scrollList('right')}/>}
            <div className={styles.cardList} ref={listRef}>
                {movies.map(el =>
                    <SectionCard key={el.id} item={el} />
                )}
            </div>
        </div>
    </>
}

export default CardList