import { useEffect } from 'react'
import { TiWarningOutline } from "react-icons/ti";
import TryAgainBtn from './TryAgainBtn';
import styles from './ErrorFallback.module.css'

function ErrorFallback() {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    function onReload() {
        window.location.reload()
    }

    return <div className={styles.errorFallback}>
        <div className={styles.error}>
            <div className={styles.icon}>
                <TiWarningOutline fontSize={100} />
            </div>
            <p className={styles.title}>Something weng wrong</p>
            <p className={styles.subtitle}>Failed to load data. Check your connection and try again.</p>
            <TryAgainBtn onRetry={onReload} />
        </div>
    </div>
}

export default ErrorFallback