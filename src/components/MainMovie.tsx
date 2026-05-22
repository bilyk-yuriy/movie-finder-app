import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaBookmark } from 'react-icons/fa6';
import { BsBookmarkHeartFill } from "react-icons/bs";
import { fetchTrendingMovies, fetchMovie } from "../api/tmdb"
import Container from './Container'
import WatchlistBtn from './WatchListBtn';
import { WatchListContext } from '../contexts/WatchListContext';
import { BASE_URL_IMAGE } from '../constants';
import styles from './MainMovie.module.css'
import type { MovieWithGenres } from '../types';


let cachedIndex: number | null = null

function MainMovie() {
    
    const { data: trendingMovie, isLoading: isTrendingLoading, isError: isTrendingError } = useQuery({
        queryKey: ['trendingMovie'],
        queryFn: () => fetchTrendingMovies('week'),
        staleTime: Infinity,
    })

    const [randomIndex, setRandomIndex] = useState<number | null>(cachedIndex)

    const selectedMovieId = randomIndex !== null && trendingMovie
        ? trendingMovie.results[randomIndex].id
        : undefined

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mainMovie', selectedMovieId],
        queryFn: () => {
            if (selectedMovieId === undefined) throw new Error('No movie id')
            return fetchMovie(selectedMovieId)
        },
        enabled: selectedMovieId !== undefined,
        staleTime: Infinity,
    })

    useEffect(()=> {
        if (!trendingMovie || randomIndex !== null) return
        const index = Math.floor(Math.random() * trendingMovie.results.length)
        cachedIndex = index
        setRandomIndex(index)
    },[trendingMovie])

    const watchlistContext = useContext(WatchListContext)
    if (!watchlistContext) return null
    const { watchlist, toggleWatchList } = watchlistContext

    if (isTrendingLoading || isLoading || randomIndex === null) return <div>Завантажується...</div>
    if (isTrendingError || isError || !data) return <div>Щось пішло не так...</div>

    const found = watchlist.find(el => el.id === data.id)
    const release = data.release_date.slice(0, 4)
    const hours = Math.floor(data.runtime / 60)
    const minutes = data.runtime % 60
    const textRunTime = (minutes === 0 && hours === 0) ? undefined : hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`
    const genre = data.genres.map(el => el.name).join(', ')
    const rating = data.vote_average.toFixed(1)
    const description = data.overview.length > 100
        ? data.overview.substring(0, data.overview.lastIndexOf(' ', 100)) + '...'
        : data.overview

    const movie: MovieWithGenres = { ...data, genres: data.genres.map(el => el.name) }

    return <section className={styles.mainmovieWrapper} style={{ backgroundImage: `url(${BASE_URL_IMAGE}w1280${data.backdrop_path})` }}>
        <Container>
            <div className={styles.mainmovieContent}>
                <div className={styles.posterContainer}>
                    <Link to={`/movie/${data.id}`}>
                        <img className={styles.poster} src={`${BASE_URL_IMAGE}w500${data.poster_path}`} alt="" />
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