import { useQuery } from '@tanstack/react-query'
import type { MoviePreviewList } from '../types'
import Container from './Container'
import SectionList from './SectionList'
import TimeToggle from './TimeToggle'
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
 
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKey,
        queryFn: queryFn
    })

    if (isLoading) return <div>Завантажується...</div>
    if (isError) return <div>Щось пішло не так...</div>

    return <section className={styles.moviesectionWrapper}>
        <Container wide>
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{title}</h2>
                {trending && timeWindow && toggleTimeWindow && <TimeToggle timeWindow={timeWindow} toggleTimeWindow={toggleTimeWindow}/>}
            </div>
            <SectionList movies={data?.results ?? []} upcoming={upcoming} />
        </Container>
    </section>
}

export default MovieSection