import Container from '../../components/Container'
import SkeletonMovieCard from '../../components/SkeletonMovieCard'
import styles from './SkeletonSearchPage.module.css'

function SkeletonSearchPage() {

    return <div className={styles.wrapper}>
            <Container>
                <div className={styles.container}>
                    <div className={`${styles.text} global-shimmer`}></div>
                    <div className={`${styles.title} global-shimmer`}></div>
                </div>
                <SkeletonMovieCard />
            </Container>
        </div>
}

export default SkeletonSearchPage