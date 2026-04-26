import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaBookmark } from 'react-icons/fa6';
import { BsBookmarkHeartFill } from "react-icons/bs";
import { fetchTrendingMovies, fetchFullMovie } from "../api/tmdb"
import Container from './Container'
import WatchlistBtn from './WatchListBtn';
import { WatchListContext } from '../contexts/WatchListContext';
import styles from './MainMovie.module.css'
import type { MovieWithGenres } from '../types';

function MainMovie() {

    const { data: trendingMovie, isLoading: isTrendingLoading, isError: isTrendingError } = useQuery({
        queryKey: ['trendingMovie'],
        queryFn: fetchTrendingMovies,
        staleTime: 1000 * 60 * 60
    })

    const [randomMovie, setRandomMovie] = useState<number | null>(null)

    const selectedMovieId = randomMovie !== null && trendingMovie
        ? trendingMovie.results[randomMovie].id
        : undefined

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mainMovie'],
        queryFn: () => {
            if (selectedMovieId === undefined) throw new Error('No movie id')
            return fetchFullMovie(selectedMovieId)
        }
    })

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist, toggleWatchList } = watchlistContext

    useEffect(() => {
        if (randomMovie !== null) return
        if (!trendingMovie) return
        const randomIndex = Math.floor(Math.random() * trendingMovie.results.length)
        setRandomMovie(randomIndex)
    }, [trendingMovie])

    if (isTrendingLoading || isLoading) return <div>Завантажується...</div>
    if (isTrendingError || isError || !data) return <div>Щось пішло не так...</div>

    const BASE_URL = 'https://image.tmdb.org/t/p/'
    const found = watchlist.find(el => el.id === data.id)
    const release = data.release_date.slice(0, 4)
    const hours = Math.floor(data.runtime / 60)
    const minutes = data.runtime % 60
    const textRunTime = `${hours}г ${minutes}хв`
    const genre = data.genres.map(el => el.name).join(', ')
    const rating = data.vote_average.toFixed(1)
    const description = data.overview.length > 100
        ? data.overview.substring(0, data.overview.lastIndexOf(' ', 100)) + '...'
        : data.overview

    const movie: MovieWithGenres = {...data, genres: data.genres.map(el=> el.name)}

    return <section className={styles.mainmovieWrapper} style={{ backgroundImage: `url(${BASE_URL}w1280${data.backdrop_path})` }}>
        <Container>
            <div className={styles.mainmovieContent}>
                <div className={styles.posterContainer}>
                    <Link to={`/movie/${data.id}`}>
                        <img className={styles.poster} src={`${BASE_URL}w500${data.poster_path}`} alt="" />
                    </Link>
                    <button onClick={() => toggleWatchList(movie)} className={styles.bookmarkBtn}>
                        {found ? <BsBookmarkHeartFill title='add to watchlist' /> : <FaBookmark title='add to watchlist' />}
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    <h2>{data.title}</h2>
                    <p>
                        <span>{release}</span>
                        {textRunTime && <span> • {textRunTime} • </span>}
                        <span>{genre}</span>
                    </p>
                    <p className={styles.movieDescription}>
                        {data.vote_average > 0 && <span>{`✩ ${rating}`}</span>}
                        <span> • {description + '\u00A0'}</span>
                        <Link to={`/movie/${data.id}`}><span className={styles.moreLink} title='look more'>(more)</span></Link>
                    </p>
                    <WatchlistBtn movie={movie} />
                </div>
            </div>
        </Container>
    </section>
}

export default MainMovie