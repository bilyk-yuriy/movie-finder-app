import Container from '../../Container'
import SkeletonMediaList from '../MediaList/SkeletonMediaList'
import styles from './SkeletonMoviePage.module.css'

function SkeletonMoviePage() {

    return <div className={styles.wrapper}>
        <Container wide>
            <div className={styles.container}>
                <div className={styles.visualContainer}>
                    <div className={`${styles.poster} global-shimmer`}></div>
                    <div className={`${styles.trailer} global-shimmer`}></div>
                </div>
                <div className={styles.detailsContainer}>
                    <div className={`${styles.title} global-shimmer`}></div>                    
                    <div className={`${styles.descriptionStart} global-shimmer`}></div>
                    <div className={`${styles.descriptionEnd} global-shimmer`}></div>
                    <div className={`${styles.addBtn} global-shimmer`}></div>
                    <div className={`${styles.aboutMovie} global-shimmer`}></div>
                    <div className={styles.info}>
                        <div className={`${styles.leftRelease} global-shimmer`}></div>
                        <div className={`${styles.release} global-shimmer`}></div>
                        <div className={`${styles.leftCountries} global-shimmer`}></div>
                        <div className={`${styles.countries} global-shimmer`}></div>
                        <div className={`${styles.leftGenre} global-shimmer`}></div>
                        <div className={`${styles.genres} global-shimmer`}></div>
                        <div className={`${styles.leftCompanies} global-shimmer`}></div>
                        <div className={`${styles.companies} global-shimmer`}></div>
                        <div className={`${styles.leftRuntime} global-shimmer`}></div>
                        <div className={`${styles.runtime} global-shimmer`}></div>
                        <div className={`${styles.leftRating} global-shimmer`}></div>
                        <div className={`${styles.rating} global-shimmer`}></div>
                        <div className={`${styles.leftBudget} global-shimmer`}></div>
                        <div className={`${styles.budget} global-shimmer`}></div>
                        <div className={`${styles.leftRevenue} global-shimmer`}></div>
                        <div className={`${styles.revenue} global-shimmer`}></div>
                        <div className={`${styles.leftTagline} global-shimmer`}></div>
                        <div className={`${styles.tagline} global-shimmer`}></div>
                    </div>
                </div>
            </div>
            <div className={`${styles.cast} global-shimmer`}></div>
            <SkeletonMediaList character/>
            <div className={`${styles.similar} global-shimmer`}></div>
            <SkeletonMediaList />
        </Container>
    </div>
}

export default SkeletonMoviePage