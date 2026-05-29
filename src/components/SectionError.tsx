import { TbCloudOff } from "react-icons/tb";
import Container from "./Container";
import TryAgainBtn from "./TryAgainBtn";
import styles from './SectionError.module.css'

function SectionError({ onRetry }: { onRetry: ()=> void }) {

    return <div className={styles.errorWrapper}>
        <Container wide>
            <div className={styles.errorContent}>
                <TbCloudOff size={80} />
                <span className={styles.title}>Failed to load</span>
                <TryAgainBtn onRetry={onRetry}/>
            </div>
        </Container>
    </div>
}

export default SectionError