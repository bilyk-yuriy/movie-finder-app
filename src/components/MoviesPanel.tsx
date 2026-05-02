import { useState, type Dispatch, type SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchPopularMovies, fetchUpcomingMovies } from '../api/tmdb'
import type { Category } from '../types'
import useFetchGenres from '../hooks/useFetchGenres'
import Container from '../components/Container'
import MovieList from './MovieList'
import styles from '../components/MoviesPanel.module.css'

type MoviesPanelProp = {
    active: Category,
    setActive: Dispatch<SetStateAction<Category>>,
}

function MoviesPanel({ active, setActive }: MoviesPanelProp) {

    const queryVariantCategoty = {
        top250: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        top500: {key: 'topRatedMovie', fn: fetchTopRatedMovies},
        trending: {key: 'trendingMovie', fn: fetchTrendingMovies},
        popular: {key: 'popularMovie', fn: fetchPopularMovies},
        upcoming: {key: 'upcomingMovie', fn: fetchUpcomingMovies},
    }

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres()

    const [page, setPage] = useState<number>(1)

    const {key, fn} = queryVariantCategoty[active]

    const { data, isLoading, isError } = useQuery({
        queryKey: [key, page],
        queryFn: ()=> fn(page),
    })

    if (isLoading || isGenresLoading) return <div>Завантажується</div>
    if (isError || isGenresError || !data|| !genresData) return <div>Щось пішло не так...</div>

    const movies = data.results.map(el=> (
        { ...el, genres: el.genre_ids.map(id => genresData.genres.find(item => item.id === id)?.name ?? '').filter(Boolean)}
    ))

    return <div className={styles.moviesContainer}>
        <Container wide>
        <div className={styles.moviesCategory}>
            <button onClick={() => setActive('top250')} className={active === 'top250' ? styles.active : ''}>TOP 250</button>
            <button onClick={() => setActive('top500')} className={active === 'top500' ? styles.active : ''}>TOP 500</button>
            <button onClick={() => setActive('trending')} className={active === 'trending' ? styles.active : ''}>TRENDING</button>
            <button onClick={() => setActive('popular')} className={active === 'popular' ? styles.active : ''}>POPULAR</button>
            <button onClick={() => setActive('upcoming')} className={active === 'upcoming' ? `${styles.active} ${styles.upcomingBtn}` : styles.lastBtn}>UPCOMING</button>
        </div>
        <MovieList movies={movies} showIndex/>
        </Container>
    </div>
}

export default MoviesPanel