import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies, fetchPopularMovies, fetchUpcomingMovies } from '../api/tmdb'
import type { Genres } from '../types'
import Container from '../components/Container'
import MovieList from './MovieList'
import Pagination from './Pagination'
import useAllMovieParams from '../hooks/useAllMovieParams'
import styles from '../components/MoviesPanel.module.css'

type MoviePanelProp = {
    genresData: Genres
}

function MoviesPanel({genresData}: MoviePanelProp) {

    const topRated = { key: 'topRatedMovie', fn: fetchTopRatedMovies }

    const queryVariantCategoty = {
        top250: topRated,
        top500: topRated,
        popular: { key: 'popularMovie', fn: fetchPopularMovies },
        upcoming: { key: 'upcomingMovie', fn: fetchUpcomingMovies },
    }

    const { setSearchParams, genres, country, rating, releaseDateFrom, releaseDateTo, active, page} = useAllMovieParams()

    function selectCategory(name: string) {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('category', name)
            params.set('page', String(1))
            return params
        })
    }

    const { key, fn } = queryVariantCategoty[active]

    const { data, isLoading, isError } = useQuery({
        queryKey: [key, page, genres, country, rating, releaseDateFrom, releaseDateTo],
        queryFn: () => fn(page, genres, country, rating, releaseDateFrom, releaseDateTo),
    })

    function setPage(page: number) {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('page', String(page))
            return params
        })
    }

    if (isLoading) return <div>Завантажується</div>
    if (isError || !data) return <div>Щось пішло не так...</div>

    const allMovies = data.results.map(el => (
        { ...el, genres: el.genre_ids.map(id => genresData.genres.find(item => item.id === id)?.name ?? '').filter(Boolean) }
    ))

    const movies = active === 'top250' && page === 13 ? allMovies.slice(0, 10) : allMovies

    const totalPages = active === 'top250' ? Math.min(data.total_pages, 13) : active === 'top500' ? Math.min(data.total_pages, 25) : Math.min(data.total_pages, 500)

    return <div className={styles.moviesContainer}>
        <Container wide>
            <div className={styles.moviesCategory}>
                <button onClick={() => selectCategory('popular')} className={active === 'popular' ? styles.active : ''}>POPULAR</button>
                <button onClick={() => selectCategory('upcoming')} className={active === 'upcoming' ? styles.active : ''}>UPCOMING</button>
                <button onClick={() => selectCategory('top250')} className={active === 'top250' ? styles.active : ''}>TOP 250</button>
                <button onClick={() => selectCategory('top500')} className={active === 'top500' ? styles.active : ''}>TOP 500</button>
            </div>
            <MovieList movies={movies} currentPage={page} showIndex />
            {totalPages !== 1 && <Pagination totalPage={totalPages} page={page} setPage={setPage} />}
        </Container>
    </div>
}

export default MoviesPanel