import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies, fetchPopularMovies, fetchUpcomingMovies } from '../api/tmdb'
import type { Category } from '../types'
import useFetchGenres from '../hooks/useFetchGenres'
import Container from '../components/Container'
import MovieList from './MovieList'
import Pagination from './Pagination'
import styles from '../components/MoviesPanel.module.css'

type MoviePanelProp = {
    genres: number | undefined
    country: string | undefined
    voteAverage: number | undefined
    releaseDateFrom: string | undefined
    releaseDateTo: string | undefined
}

function MoviesPanel({genres, country, voteAverage, releaseDateFrom, releaseDateTo}: MoviePanelProp) {

    const queryVariantCategoty = {
        top250: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        top500: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        popular: {key: 'popularMovie', fn: fetchPopularMovies},
        upcoming: {key: 'upcomingMovie', fn: fetchUpcomingMovies},
    }

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres()

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [searchParams, setSearchParams] = useSearchParams()

    const param = searchParams.get('category') ?? 'popular'
    const active = (param in queryVariantCategoty ? param : 'popular') as Category

    const {key, fn} = queryVariantCategoty[active]

    const { data, isLoading, isError } = useQuery({
        queryKey: [key, currentPage, genres, country, voteAverage, releaseDateFrom, releaseDateTo],
        queryFn: ()=> fn(currentPage, genres, country, voteAverage, releaseDateFrom, releaseDateTo),
    })

    if (isLoading || isGenresLoading) return <div>Завантажується</div>
    if (isError || isGenresError || !data|| !genresData) return <div>Щось пішло не так...</div>

    const allMovies = data.results.map(el=> (
        { ...el, genres: el.genre_ids.map(id => genresData.genres.find(item => item.id === id)?.name ?? '').filter(Boolean)}
    ))

    const movies = active === 'top250' && currentPage === 13 ? allMovies.slice(0, 10) : allMovies

    const totalPages = active === 'top250' ? Math.min(data.total_pages, 13) : active === 'top500' ? Math.min(data.total_pages, 25) : Math.min(data.total_pages, 500)

    return <div className={styles.moviesContainer}>
        <Container wide>
        <div className={styles.moviesCategory}>
            <button onClick={() => { setSearchParams({category: 'popular'}); setCurrentPage(1)}} className={active === 'popular' ? styles.active : ''}>POPULAR</button>
            <button onClick={() => { setSearchParams({category: 'upcoming'}); setCurrentPage(1)}} className={active === 'upcoming' ? styles.active : ''}>UPCOMING</button>
            <button onClick={() => { setSearchParams({category: 'top250'}); setCurrentPage(1)}} className={active === 'top250' ? styles.active : ''}>TOP 250</button>
            <button onClick={() => { setSearchParams({category: 'top500'}); setCurrentPage(1)}} className={active === 'top500' ? styles.active : ''}>TOP 500</button>         
        </div>
        <MovieList movies={movies} currentPage={currentPage} showIndex />
        {totalPages !== 1 && <Pagination totalPage={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
        </Container>
    </div>
}

export default MoviesPanel