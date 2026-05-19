import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from './ScrollBtn.module.css'

type ScrollBtn = {
    smallBtn?: boolean
    type: 'left' | 'right'
    scrollList: (direction: 'left' | 'right') => void
}

function ScrollBtn({smallBtn, type, scrollList}: ScrollBtn) {

    return <>
    {type === 'left' && <button onClick={()=> scrollList('left')} className={smallBtn ? styles.leftBtnSmall : styles.leftBtn}><IoIosArrowBack size={smallBtn ? 25 : 40}/></button>}
    {type === 'right' && <button onClick={()=> scrollList('right')} className={smallBtn ? styles.rightBtnSmall : styles.rightBtn}><IoIosArrowForward size={smallBtn ? 25 : 40}/></button>}
    </>
}

export default ScrollBtn