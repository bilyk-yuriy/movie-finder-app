import ScrollBtn from './ScrollBtn';
import useListRef from '../hooks/useListRef';
import styles from './MediaList.module.css'

type MediaListProp<T> = {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

function MediaList<T>({ items, renderItem }: MediaListProp<T>) {

    const {listRef, atStart, atEnd, scrollList} = useListRef(items, 6)

    return <div className={styles.wrapper}>    
        {items.length > 6 && !atStart && <ScrollBtn smallBtn type={'left'} scrollList={()=> scrollList('left')}/>}
        {items.length > 6 && !atEnd && <ScrollBtn smallBtn type={'right'} scrollList={()=> scrollList('right')}/>}
        <div className={styles.itemsContainer} ref={listRef}>
            {items.map((item, index) =>
                <div key={index}>
                    {renderItem(item)}
                </div>
            )}
        </div>
    </div>
}

export default MediaList