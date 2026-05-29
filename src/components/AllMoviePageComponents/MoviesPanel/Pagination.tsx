import styles from './Pagination.module.css'

type PaginationProp = {
    totalPage: number
    page: number
    setPage: (page: number)=> void
}

function Pagination({ totalPage, page, setPage }: PaginationProp) {

    const nextPage1 = page + 1
    const nextPage2 = page + 2
    const nextPage3 = page + 3
    const nextPage4 = page + 4

    const showLastPage = totalPage !== page
        && totalPage !== nextPage1
        && totalPage !== nextPage2
        && totalPage !== nextPage3
        && totalPage !== nextPage4

    return <div className={styles.paginationContainer}>
        {page !== 1 && <button onClick={()=> setPage(page - 1)}>❮</button>}
        {page >= 5 && <button onClick={()=> setPage(1)}>1</button>}
        {page > 4 && <button onClick={()=> setPage(page - 4)}>...</button>}
        {page > 3 && <button onClick={()=> setPage(page - 3)}>{page - 3}</button>}
        {page > 2 && <button onClick={()=> setPage(page - 2)}>{page - 2}</button>}
        {page > 1 && <button onClick={()=> setPage(page - 1)}>{page - 1}</button>}
        <button className={styles.active}>{page}</button>
        {page < totalPage && <button onClick={()=> setPage(page + 1)}>{nextPage1}</button>}
        {nextPage2 <= totalPage && <button onClick={()=> setPage(page + 2)}>{nextPage2}</button>}
        {nextPage3 <= totalPage && <button onClick={()=> setPage(page + 3)}>{nextPage3}</button>}
        {nextPage4 <= totalPage && <button onClick={()=> setPage(page + 4)}>...</button>}
        {showLastPage && <button onClick={()=> setPage(totalPage)}>{totalPage}</button>}
        {page !== totalPage && <button onClick={()=> setPage(page + 1)}>❯</button>}
    </div>
}

export default Pagination