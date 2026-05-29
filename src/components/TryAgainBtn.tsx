import { HiOutlineRefresh } from "react-icons/hi";
import styles from './TryAgainBtn.module.css'

function TryAgainBtn({onRetry}: {onRetry: ()=> void}) {

    return <button onClick={onRetry} className={styles.againBtn}>
                    <HiOutlineRefresh size={20} color="white"/>
                    <span className={styles.text}>Try again</span>
                </button>
}

export default TryAgainBtn