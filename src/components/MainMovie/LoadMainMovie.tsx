import Container from '../Container'
import styles from './LoadMainMovie.module.css'

function MainMovieLoad() {

    return <div className={styles.wrapper}>
        <Container>
            <div className={styles.content}>
                <div className={`${styles.poster} global-shimmer`}></div>
                <div className={styles.detailsContainer}>
                    <div className={`${styles.title} global-shimmer`}></div>
                    <div className={`${styles.border} global-shimmer`}></div>
                    <div className={styles.yearRuntimeGenre}>
                        <div className={`${styles.year} global-shimmer`}></div>
                        <div className={`${styles.runtime} global-shimmer`}></div>
                        <div className={`${styles.genres} global-shimmer`}></div>
                    </div>
                    <div className={`${styles.genresEnd} global-shimmer`}></div>
                    <div className={styles.ratingDesc}>
                        <div className={`${styles.rating} global-shimmer`}></div>
                        <div className={`${styles.descStart} global-shimmer`}></div>
                    </div>
                    <div className={`${styles.descCenter} global-shimmer`}></div>
                    <div className={styles.descLink}>
                        <div className={`${styles.descEnd} global-shimmer`}></div>
                        <div className={`${styles.link} global-shimmer`}></div>
                    </div>
                    <div className={`${styles.addBtn} global-shimmer`}></div>
                </div>
            </div>
        </Container>
    </div>


}

export default MainMovieLoad