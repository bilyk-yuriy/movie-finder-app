import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import type { MoviePreviewList } from '../../types'
import Container from '../Container'
import SectionList from '../SectionList'
import TimeToggle from '../TimeToggle'
import { fetchMovie } from '../../api/tmdb'
import SectionError from '../SectionError'
import SkeletonMovieSection from './SkeletonMovieSection'
import styles from './MovieSection.module.css'


type MovieSectionProp = {
    queryKey: string[],
    queryFn: () => Promise<MoviePreviewList>,
    title: string,
    category: 'trending' | 'popular' | 'upcoming' | 'top'
    timeWindow?: 'week' | 'day'
    toggleTimeWindow?: () => void
}

function MovieSection({ queryKey, queryFn, title, category, timeWindow, toggleTimeWindow }: MovieSectionProp) {

    const { data, isLoading, isError, isPlaceholderData } = useQuery({
        queryKey: queryKey,
        queryFn: queryFn,
        placeholderData: keepPreviousData,
    })

    const { data: dataFirstMovie } = useQuery({
        queryKey: ['trailerMovie', data?.results[0].id],
        queryFn: () => {
            if (!data) throw new Error('no data')
            return fetchMovie(data?.results[0].id)
        },
        enabled: !!(category === 'trending') && !!data,
    })

    const queryClient = useQueryClient()

    function retryAll() {
        queryClient.refetchQueries({ type: 'active', predicate: (query) => query.state.status === 'error' })
    }

    const trailer = dataFirstMovie?.videos.results.find(el => el.official === true && el.type === 'Trailer')?.key

    if (isLoading) return <SkeletonMovieSection category={category} />
    if (isError) return <SectionError onRetry={retryAll} />


    return <section className={styles.moviesectionWrapper}>
        <Container wide>
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{title}</h2>
                {category === 'trending' && timeWindow && toggleTimeWindow && <TimeToggle timeWindow={timeWindow} toggleTimeWindow={toggleTimeWindow} />}
                {isPlaceholderData && <div className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>}
            </div>
            {(category !== 'trending' || trailer) && <SectionList movies={data?.results ?? []} category={category} trailer={trailer} timeWindow={timeWindow} />}
        </Container>
    </section>
}

export default MovieSection