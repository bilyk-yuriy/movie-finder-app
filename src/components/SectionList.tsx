import { useRef } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import type { MoviePreview } from "../types"
import SectionCard from "./SectionCard"
import styles from './SectionList.module.css'

type CardListProp = {
    movies: MoviePreview[]
}

function CardList({ movies }: CardListProp) {

    const listRef = useRef<HTMLDivElement>(null)

    function handleClick(direction: 'left' | 'right') {

        if (!listRef.current) return

        const card = listRef.current?.children[0] as HTMLElement
        const cardWidth = card.clientWidth + 20

        const remainder = listRef.current.scrollLeft % cardWidth

        const forwardRight = remainder === 0 ? cardWidth * 4 : cardWidth * 4 + (cardWidth - remainder)
        const forwardLeft = remainder === 0 ? cardWidth * 4 : cardWidth * 4 + remainder

        listRef.current?.scrollBy({
            left: direction === 'left' ? -(forwardLeft) : forwardRight,
            behavior: 'smooth'
        })
    }

    return <>
        <div className={styles.wrapper}>
            <button className={styles.leftBtn} onClick={() => handleClick('left')}><IoIosArrowBack size={40}/></button>
            <button className={styles.rightBtn} onClick={() => handleClick('right')}><IoIosArrowForward size={40}/></button>
            <div className={styles.cardList} ref={listRef}>
                {movies.map(el =>
                    <SectionCard key={el.id} item={el} />
                )}
            </div>
        </div>
    </>
}

export default CardList