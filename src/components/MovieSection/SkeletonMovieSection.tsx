import Container from '../Container'
import styles from './SkeletonMovieSection.module.css'

function MovieSectionLoad({ category }: { category: 'trending' | 'popular' | 'upcoming' | 'top' }) {

    return <div className={styles.wrapper}>
        <Container wide>
            <>
                {category === 'trending' && <div className={styles.titleFlex}>
                    <div className={`${styles.titleTrending} global-shimmer`}></div>
                    <div className={`${styles.switch} global-shimmer`}></div>
                </div>}
                {category !== 'trending' && <div className={`${styles.title} global-shimmer`}></div>}
                <div className={styles.movieSectionContent}>
                    {category === 'trending' && <>
                        <div className={styles.trailerContainer}>
                            <div className={`${styles.trailer} global-shimmer`}></div>
                            <div className={styles.info}>
                                <div className={`${styles.text} global-shimmer`}></div>
                                <div className={`${styles.addBtn} global-shimmer`}></div>
                                <div className={`${styles.link} global-shimmer`}></div>
                            </div>
                        </div>
                        {Array.from({ length: 2 }).map((_, i) =>
                        (<div key={i} className={styles.card}>
                            <div className={`${styles.poster} global-shimmer`}></div>
                            <div className={`${styles.titleStart} global-shimmer`}></div>
                            <div className={`${styles.titleEnd} global-shimmer`}></div>
                            <div className={`${styles.yearRating} global-shimmer`}></div>
                        </div>)
                        )}
                    </>
                    }
                    {category !== 'trending' && <>
                        {Array.from({ length: 5 }).map((_, i) =>
                        (<div key={i} className={styles.card}>
                            <div className={`${styles.poster} global-shimmer`}></div>
                            <div className={`${styles.titleStart} global-shimmer`}></div>
                            <div className={`${styles.titleEnd} global-shimmer`}></div>
                            <div className={`${styles.yearRating} global-shimmer`}></div>
                        </div>)
                        )}
                    </>
                    }
                </div>
            </>
        </Container>
    </div>
}

export default MovieSectionLoad