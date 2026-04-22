import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchMovie } from "../api/tmdb"
import WatchlistBtn from '../components/WatchListBtn'
import styles from './MoviePage.module.css'

function MoviePage() {

    const { id } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovie(Number(id))
    })

    if (isLoading) return <div>Завантажується...</div>
    if (isError || !data) return <div>Щось сталось не так...</div>

    const BASE_URL = 'https://image.tmdb.org/t/p/'


    const genres = data.genres.map(el => el.name).join(', ')
    const release = data.release_date.slice(0, 4)
    const trailer = data.videos.results.find(el => el.official === true && el.type === 'Trailer')?.key
    const hours = Math.floor(data.runtime / 60)
    const minutes = data.runtime % 60
    const runtime = hours ? `${hours}г ${minutes}хв` : minutes ? `${minutes}хв` : undefined
    const actors = data.credits.cast.slice(0, 20)
    const recommendations = data.recommendations.results.filter(el => el.vote_count > 2000).slice(0, 20)

    return <>
        <img className={styles.wrapper} src={`${BASE_URL}w1280${data.backdrop_path}`} alt="" />
        <img className={styles.poster} src={`${BASE_URL}w1280${data.poster_path}`} alt="" />
        <div>{data.title}</div>
        <div>{release}</div>
        <div> • {genres} • </div>
        <div>{runtime}</div>
        <WatchlistBtn movie={data}/>
        <div>{data.overview}</div>

        <iframe src={`https://www.youtube.com/embed/${trailer}`} />

        {actors.map((el, index) =>
            <div key={index}>
                {el.profile_path ? <img className={styles.poster} src={`${BASE_URL}w500${el.profile_path}`} alt="" /> : <div className={styles.emptyPoster}>Фото відсутнє</div>}
                <div>{el.name}</div>
                <div>{el.character ? el.character : 'персонаж відсутній'}</div>
            </div>
        )}

         {recommendations.map((el, index) =>
            <div key={index}>
                {el.poster_path ? <img className={styles.poster} src={`${BASE_URL}w1280${el.poster_path}`} alt="" /> : <div className={styles.emptyPoster}>Фото відсутнє</div>}
                <div>{el.title}</div>
            </div>
        )}

    </>
}

export default MoviePage