import { Link } from 'react-router-dom'
import type { Actor } from '../../../types'
import { BASE_URL_IMAGE } from '../../../constants'
import styles from './ActorCard.module.css'

type ActorCardProp = {
    actor: Actor
}

function ActorCard({ actor }: ActorCardProp) {

    return <Link to={`/actor/${actor.id}`}>
    <div className={styles.card}>
        {actor.profile_path ? <img className={styles.poster} src={`${BASE_URL_IMAGE}w500${actor.profile_path}`} alt="" /> : <div className={styles.emptyPoster}>photo is missing</div>}
        <div className={styles.info}>
            <div className={styles.name}>{actor.name}</div>
            <div className={styles.character}>{actor.character ? actor.character : 'character is missing'}</div>
        </div>
    </div>
    </Link>
}

export default ActorCard