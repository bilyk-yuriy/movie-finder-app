import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { MoviePreviewList } from '../types'
import Container from './Container'
import SectionList from './SectionList'
import TimeToggle from './TimeToggle'
import { fetchMovie } from '../api/tmdb'
import styles from './MovieSection.module.css'


type MovieSectionProp = {
    queryKey: string[],
    queryFn: () => Promise<MoviePreviewList>,
    title: string,
    upcoming?: boolean
    trending?: boolean
    timeWindow?: 'week' | 'day'
    toggleTimeWindow?: () => void
}

function MovieSection({ queryKey, queryFn, title, upcoming, trending, timeWindow, toggleTimeWindow }: MovieSectionProp) {

    const { data, isLoading, isError, isPlaceholderData } = useQuery({
        queryKey: queryKey,
        queryFn: queryFn,
        placeholderData: keepPreviousData,
    })

    const { data: dataFirstMovie } = useQuery({
        queryKey: ['trailerMovie', data?.results[0].id],
        queryFn: ()=> {
            if (!data) throw new Error('no data')
            return fetchMovie(data?.results[0].id)
        },
        enabled: !!trending && !!data
    })

    const trailer = dataFirstMovie?.videos.results.find(el => el.official === true && el.type === 'Trailer')?.key

    if (isLoading) return <div>Завантажується...</div>
    if (isError) return <div>Щось пішло не так...</div>

    return <section className={styles.moviesectionWrapper}>
        <Container wide>
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{title}</h2>
                {trending && timeWindow && toggleTimeWindow && <TimeToggle timeWindow={timeWindow} toggleTimeWindow={toggleTimeWindow} />}
                {isPlaceholderData && <div className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>}
            </div>
            <SectionList movies={data?.results ?? []} upcoming={upcoming} trending={trending} trailer={trailer} timeWindow={timeWindow}/>
        </Container>
    </section>
}

export default MovieSection