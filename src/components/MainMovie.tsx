import { useState, useEffect, useMemo, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaBookmark } from 'react-icons/fa6';
import { fetchRunTime, fetchTrendingMovies, fetchGenres } from "../api/tmdb"
import Container from './Container'
import WatchlistBtn from './WatchListBtn';
import { WatchListContext } from '../contexts/WatchLIstContext';
import styles from './MainMovie.module.css'

function MainMovie() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['trendingMovie'],
        queryFn: fetchTrendingMovies,
        staleTime: 1000 * 60 * 60
    })

    const { data: genresData } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: 1000 * 60 * 60 * 24
    })

    const [randomMovie, setRandomMovie] = useState<number | null>(null)

    const selectedMovieId = randomMovie !== null && data
        ? data.results[randomMovie].id
        : undefined

    const { data: runtimeData } = useQuery({
        queryKey: ['runtime', selectedMovieId],
        queryFn: () => {
            if (selectedMovieId === undefined) throw new Error('No movie id')
            return fetchRunTime(selectedMovieId)
        },
        enabled: selectedMovieId !== undefined,
        staleTime: Infinity
    })

    const watchlist = useContext(WatchListContext)
    if (!watchlist) return null
    const { addToWatchList } = watchlist

    useEffect(() => {
        if (randomMovie !== null) return
        if (!data) return
        const randomIndex = Math.floor(Math.random() * data.results.length)
        setRandomMovie(randomIndex)
    }, [data])

    const movie = randomMovie !== null && data?.results[randomMovie]

    const movieGenre = useMemo(() => {
        if (!movie) return []
        return movie.genre_ids.map(el => {
            const foundGenre = genresData?.genres.find(item => item.id === el)
            return foundGenre ? foundGenre.name : null
        }).filter(Boolean)
    }, [movie, genresData])

    if (isLoading) return <div>Завантажується...</div>
    if (isError || !movie) return <div>Щось пішло не так...</div>

    const hours = runtimeData ? Math.floor(runtimeData.runtime / 60) : null
    const minutes = runtimeData ? runtimeData.runtime % 60 : null
    const textRunTime = hours ? `${hours}г ${minutes}хв` : minutes ? `${minutes}хв` : null

    const description = movie.overview.length > 100
        ? movie.overview.substring(0, movie.overview.lastIndexOf(' ', 100)) + '...'
        : movie.overview

    const BASE_URL = 'https://image.tmdb.org/t/p/'
    const release = movie.release_date.slice(0, 4)
    const rating = movie.vote_average.toFixed(1)

    return <section className={styles.mainmovieWrapper} style={{ backgroundImage: `url(${BASE_URL}w1280${movie.backdrop_path})` }}>
        <Container>
            <div className={styles.mainmovieContent}>
                <div className={styles.posterContainer}>
                    <Link to={`/movie/${movie.id}`}>
                        <img className={styles.poster} src={`${BASE_URL}w500${movie.poster_path}`} alt="" />
                    </Link>
                    <button onClick={()=> addToWatchList(movie)} className={styles.bookmarkBtn}>
                        <FaBookmark title='add to watchlist' />
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    <h2>{movie.title}</h2>
                    <p>
                        <span>{release}</span>
                        {textRunTime && <span> • {textRunTime} • </span>}
                        {movieGenre.length > 0 && <span>{movieGenre.join(', ')}</span>}
                    </p>
                    <p className={styles.movieDescription}>
                        {movie.vote_average > 0 && <span>{`✩ ${rating}`}</span>}
                        <span> • {description + '\u00A0'}</span>
                        <Link to={`/movie/${movie.id}`}><span className={styles.moreLink} title='look more'>(more)</span></Link>
                    </p>
                    <WatchlistBtn movie={movie}/>
                </div>
            </div>
        </Container>
    </section>
}

export default MainMovie