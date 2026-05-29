import styles from './SkeletonMovieCard.module.css'

function LoadMovieCard({isNumber}: {isNumber?: boolean}) {

    return <>
        {Array.from({ length: 20 }).map((_, i) =>
        (<div key={i}>
            <div className={`${styles.loadBorder} global-shimmer`}></div>
            <div className={styles.loadCard}>
                {isNumber && <div className={styles.loadNumber}></div>}
                <div className={`${styles.loadPoster} global-shimmer`}></div>
                <div className={styles.loadInfo}>
                    <div className={`${styles.loadTitleMovie} global-shimmer`}></div>
                    <div className={`${styles.loadYear} global-shimmer`}></div>
                    <div className={`${styles.loadGenres} global-shimmer`}></div>
                    <div className={`${styles.loadRating} global-shimmer`}></div>
                    <div className={`${styles.loadDescription} global-shimmer`}></div>
                    <div className={`${styles.loadAddBtn} global-shimmer`}></div>
                </div>
            </div>
        </div>))}
    </>
}

export default LoadMovieCard