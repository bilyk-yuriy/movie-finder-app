import styles from './SkeletonFiltersPanel.module.css'

function LoadFiltersPanel() {

    return <div className={styles.filtersContainer}>
            {Array.from({ length: 4 }).map((_, i) =>
            (<div key={i} className={styles.filter}>
                <div className={styles.arrowText}>
                    <div className={`${styles.arrow} global-shimmer`}></div>
                    <div className={`${styles.text} global-shimmer`}></div>
                </div>
                <div className={`${styles.selectBtn} global-shimmer`}></div>
            </div>))}
        </div>
}

export default LoadFiltersPanel