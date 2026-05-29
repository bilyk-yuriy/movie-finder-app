import { MdClose } from "react-icons/md";
import { BASE_YTUBE_URL } from "../../../constants";
import styles from './TrailerModal.module.css'

type TrailerModalProp = {
    trailer: string,
    closeTrailer: () => void
}

function TrailerModal({ trailer, closeTrailer }: TrailerModalProp) {

    return <>
        <div className={styles.overlay} onClick={closeTrailer}>
            <div className={styles.modalWindow}>
                <button className={styles.closeBtn}><MdClose size={35}/></button>
                <iframe src={`${BASE_YTUBE_URL}${trailer}?autoplay=1&mute=1`} />
            </div>
        </div>
    </>
}

export default TrailerModal