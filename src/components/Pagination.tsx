import { type Dispatch, type SetStateAction } from 'react'
import styles from './Pagination.module.css'

type PaginationProp = {
    totalPage: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

function Pagination({ totalPage, currentPage, setCurrentPage }: PaginationProp) {

    const nextPage1 = currentPage + 1
    const nextPage2 = currentPage + 2
    const nextPage3 = currentPage + 3
    const nextPage4 = currentPage + 4

    const showLastPage = totalPage !== currentPage
        && totalPage !== nextPage1
        && totalPage !== nextPage2
        && totalPage !== nextPage3
        && totalPage !== nextPage4

    return <div className={styles.paginationContainer}>
        {currentPage !== 1 && <button onClick={()=> setCurrentPage(currentPage - 1)}>❮</button>}
        {currentPage >= 5 && <button onClick={()=> setCurrentPage(1)}>1</button>}
        {currentPage > 4 && <button onClick={()=> setCurrentPage(currentPage - 4)}>...</button>}
        {currentPage > 3 && <button onClick={()=> setCurrentPage(currentPage - 3)}>{currentPage - 3}</button>}
        {currentPage > 2 && <button onClick={()=> setCurrentPage(currentPage - 2)}>{currentPage - 2}</button>}
        {currentPage > 1 && <button onClick={()=> setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>}
        <button className={styles.active}>{currentPage}</button>
        {currentPage < totalPage && <button onClick={()=> setCurrentPage(currentPage + 1)}>{nextPage1}</button>}
        {nextPage2 <= totalPage && <button onClick={()=> setCurrentPage(currentPage + 2)}>{nextPage2}</button>}
        {nextPage3 <= totalPage && <button onClick={()=> setCurrentPage(currentPage + 3)}>{nextPage3}</button>}
        {nextPage4 <= totalPage && <button onClick={()=> setCurrentPage(currentPage + 4)}>...</button>}
        {showLastPage && <button onClick={()=> setCurrentPage(totalPage)}>{totalPage}</button>}
        {currentPage !== totalPage && <button onClick={()=> setCurrentPage(currentPage + 1)}>❯</button>}
    </div>
}

export default Pagination