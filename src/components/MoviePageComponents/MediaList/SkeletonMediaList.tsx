import styles from './SkeletonMediaList.module.css'

function SkeletonMediaList({character}: {character?: boolean}) {

    return <div className={styles.wrapper}>
        {Array.from({ length: 20 }).map((_, i) =>
        (<div key={i} className={styles.card}>            
            <div className={`${styles.poster} global-shimmer`}></div>
            <div className={`${styles.name} global-shimmer`}></div>
            {character && <div className={`${styles.character} global-shimmer`}></div>}
        </div>))}
    </div>
}

export default SkeletonMediaList