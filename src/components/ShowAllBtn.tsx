import { FaArrowRight } from "react-icons/fa";
import styles from './ShowAllBtn.module.css'

function ShowAllBtn({ handleNavigate }: {handleNavigate: () => void}) {

    return <div className={styles.showallBtn}>
        <button onClick={handleNavigate}>
            <FaArrowRight size={40} />
        </button>
        <span>Show all</span>
    </div>
}

export default ShowAllBtn