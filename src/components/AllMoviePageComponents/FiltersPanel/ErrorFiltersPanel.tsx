import TryAgainBtn from "../../TryAgainBtn";
import styles from './ErrorFiltersPanel.module.css'

function ErrorFiltersPanel({retryAll}: {retryAll: ()=> void}) {

    return <div className={styles.wrapper}>
            <div className={styles.title}>Failed to load filters</div>
            <TryAgainBtn onRetry={retryAll}/>
        </div>
}

export default ErrorFiltersPanel