import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchPopularMovies, fetchUpcomingMovies } from '../api/tmdb'
import type { Category } from '../types'
import useFetchGenres from '../hooks/useFetchGenres'
import Container from '../components/Container'
import MovieList from './MovieList'
import Pagination from './Pagination'
import styles from '../components/MoviesPanel.module.css'

function MoviesPanel() {

    const queryVariantCategoty = {
        top250: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        top500: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        trending: {key: 'trendingMovie', fn: fetchTrendingMovies},
        popular: {key: 'popularMovie', fn: fetchPopularMovies},
        upcoming: {key: 'upcomingMovie', fn: fetchUpcomingMovies},
    }

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres()

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [searchParams, setSearchParams] = useSearchParams()
    const active = (searchParams.get('category') ?? 'top250') as Category

    const {key, fn} = queryVariantCategoty[active]

    const { data, isLoading, isError } = useQuery({
        queryKey: [key, currentPage],
        queryFn: ()=> fn(currentPage),
    })

    if (isLoading || isGenresLoading) return <div>Завантажується</div>
    if (isError || isGenresError || !data|| !genresData) return <div>Щось пішло не так...</div>

    const allMovies = data.results.map(el=> (
        { ...el, genres: el.genre_ids.map(id => genresData.genres.find(item => item.id === id)?.name ?? '').filter(Boolean)}
    ))

    const movies = active === 'top250' && currentPage === 13 ? allMovies.slice(0, 10) : allMovies

    const totalPages = active === 'top250' ? 13 : active === 'top500' ? 25 : Math.min(data.total_pages, 500)

    return <div className={styles.moviesContainer}>
        <Container wide>
        <div className={styles.moviesCategory}>
            <button onClick={() => { setSearchParams({category: 'top250'}); setCurrentPage(1)}} className={active === 'top250' ? styles.active : ''}>TOP 250</button>
            <button onClick={() => { setSearchParams({category: 'top500'}); setCurrentPage(1)}} className={active === 'top500' ? styles.active : ''}>TOP 500</button>
            <button onClick={() => { setSearchParams({category: 'trending'}); setCurrentPage(1)}} className={active === 'trending' ? styles.active : ''}>TRENDING</button>
            <button onClick={() => { setSearchParams({category: 'popular'}); setCurrentPage(1)}} className={active === 'popular' ? styles.active : ''}>POPULAR</button>
            <button onClick={() => { setSearchParams({category: 'upcoming'}); setCurrentPage(1)}} className={active === 'upcoming' ? `${styles.active} ${styles.upcomingBtn}` : styles.lastBtn}>UPCOMING</button>
        </div>
        <MovieList movies={movies} currentPage={currentPage} showIndex />
        <Pagination totalPage={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </Container>
    </div>
}

export default MoviesPanel