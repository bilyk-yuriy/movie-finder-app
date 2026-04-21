import styles from './Footer.module.css'

function Footer() {

    return <>
        <div className={styles.footerWrapper}>
            <span className={styles.title}>MovieZone · data from TMDB API</span>
        </div>
    </>
}

export default Footer