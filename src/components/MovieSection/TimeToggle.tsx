import styles from './TimeToggle.module.css'

type TimeToggleProp = {
    timeWindow: 'week' | 'day'
    toggleTimeWindow: () => void
}

function TimeToggle({timeWindow, toggleTimeWindow}: TimeToggleProp) {

    const title = timeWindow === 'week' ? 'week' : 'day'

    return <div onClick={toggleTimeWindow} className={styles.toggleWrapper}>
        <button className={timeWindow === 'week' ? styles.week : styles.day}>{title}</button>
    </div>
}

export default TimeToggle