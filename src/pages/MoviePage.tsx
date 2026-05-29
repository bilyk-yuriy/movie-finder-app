import {  useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { FaPlay } from "react-icons/fa";
import { fetchMovie } from "../api/tmdb"
import type { MovieWithGenres } from "../types"
import WatchlistBtn from '../components/WatchListBtn'
import Container from "../components/Container"
import MediaList from "../components/MoviePageComponents/MediaList/MediaList";
import ActorCard from "../components/MoviePageComponents/ActorCard/ActorCard";
import SkeletonMoviePage from "../components/MoviePageComponents/SkeletonMoviePage/SkeletonMoviePage";
import RecomendationCard from "../components/MoviePageComponents/RecomendationCard/RecomendationCard";
import ErrorFallback from "../components/ErrorFallback";
import TrailerModal from "../components/TrailerModal"
import { BASE_URL_IMAGE } from "../constants"
import styles from './MoviePage.module.css'


function MoviePage() {

    const { id } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovie(Number(id)),
        staleTime: Infinity
    })

    const [isOpenTrailer, setIsOpenTrailer] = useState(false)

    useEffect(()=> {
        document.body.style.overflow = isOpenTrailer ? 'hidden' : ''
    }, [isOpenTrailer])
    
    if (isLoading) return <SkeletonMoviePage />
    if (isError || !data || !data.credits || !data.recommendations || !data.videos) return <ErrorFallback />

    const movie: MovieWithGenres = { ...data, genres: data.genres.map(el => el.name) }

    const trailer = data.videos.results.find(el => el.official === true && el.type === 'Trailer')?.key
    const title = data.title || 'unknown'
    const description = data.overview || 'unknown'
    const release = data.release_date || 'unknown'
    const countries = data.production_countries.length !== 0 ? data.production_countries.map(el => el.name).join(',') : 'unknown'
    const genres = data.genres.length !== 0 ? data.genres.map(el => el.name).join(', ') : 'unknown'
    const companies = data.production_companies.length !== 0 ? data.production_companies.map(el => el.name).join(', ') : 'unknown'
    const hours = Math.floor(data.runtime / 60)
    const minutes = data.runtime % 60
    const runtime = data.runtime ? hours ? `${hours}h ${minutes}m` : minutes ? `${minutes}m` : undefined : 'unknown'
    const rating = data.vote_average && data.vote_count > 100 ? `✩ ${data.vote_average.toFixed(1)}` : 'unknown'
    const budget = data.budget !== 0 ? `${String(data.budget).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $` : 'unknown'
    const releaseDateMovie = data.release_date?.replaceAll('-', '') ?? ''
    const today = new Date().toISOString().split('T')[0].replaceAll('-', '')
    const revenue = !releaseDateMovie ? 'unknown' : today < releaseDateMovie ? 'upcoming' : data.revenue === 0 ? 'unknown' : `${String(data.revenue).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $`
    const tagline = data.tagline ? `«${data.tagline}»` : 'unknown'
    const actors = data.credits.cast.slice(0, 20)
    const recommendations = data.recommendations.results.filter(el => el.vote_count > 2000).slice(0, 20)
    
    return <section className={styles.moviepageWrapper} style={{
        backgroundImage: data.backdrop_path ? `url(${BASE_URL_IMAGE}original${data.backdrop_path})` : undefined,
        backgroundColor: data.backdrop_path ? 'rgba(0, 0, 0, 0.8)' : '#0f1219'
    }}>
        <Container wide>
            <div className={styles.container}>
                <div className={styles.vicualContainer}>
                    {data.poster_path ? <img src={`${BASE_URL_IMAGE}w1280${data.poster_path}`} alt="" /> : <div className={styles.emptyPoster}>photo is missing</div>}                    
                    <div className={styles.trailerPreview}>
                        {trailer ? <div onClick={()=> setIsOpenTrailer(true)} className={styles.trailer}><img src={`${BASE_URL_IMAGE}w500${data.backdrop_path}`} className={styles.posterTrailer}/></div> : <div className={styles.emptyTrailer}>trailer is missing</div>}
                        {trailer && <div onClick={()=> setIsOpenTrailer(true)} className={styles.startIcon}><FaPlay size={24} style={{ paddingLeft: '5px' }}/></div>}
                    </div>
                </div>
                <div className={styles.detailsContainer}>                    
                    <h2 className={styles.title}>{title}</h2>                    
                    <div className={styles.description}>{description}</div>
                    <WatchlistBtn movie={movie} />
                    <h3 className={styles.aboutMovie}>About movie</h3>
                    <div className={styles.info}>
                        <span className={styles.leftColumn}>Release date</span>                        
                        <div>{release}</div>
                        <span className={styles.leftColumn}>Country</span>
                        <span>{countries}</span>
                        <span className={styles.leftColumn}>Genre</span>
                        <span>{genres}</span>
                        <span className={styles.leftColumn}>Production</span>
                        <span>{companies}</span>
                        <span className={styles.leftColumn}>Running time</span>
                        <span>{runtime}</span>
                        <span>Rating</span>
                        <span>{rating}</span>
                        <span className={styles.leftColumn}>Budget</span>
                        <span>{budget}</span>
                        <span className={styles.leftColumn}>Revenue</span>
                        <span>{revenue}</span>
                        <span className={styles.leftColumn}>Tagline</span>
                        <span className={styles.tagline}>{tagline}</span>
                    </div>
                </div>
            </div>
            {actors.length !== 0 && <h4>Cast</h4>}
            <MediaList items={actors} renderItem={(item) => <ActorCard actor={item} />} />
            {recommendations.length !== 0 && <h4>Similar movies</h4>}
            <MediaList items={recommendations} renderItem={(item) => <RecomendationCard recomendation={item} />} />
        </Container>
        {isOpenTrailer && trailer && <TrailerModal trailer={trailer} closeTrailer={() => setIsOpenTrailer(false)} />}
    </section>
}

export default MoviePage