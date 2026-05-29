import { useState } from 'react'
import FiltersPanel from '../components/AllMoviePageComponents/FiltersPanel/FiltersPanel'
import MoviesPanel from '../components/AllMoviePageComponents/MoviesPanel/MoviesPanel'
import ErrorFallback from '../components/ErrorFallback'
import styles from './AllMoviePage.module.css'

function AllMoviePage() {

    const [hasError, setHasError] = useState(false)

    if (hasError) return <ErrorFallback />

    return <section className={styles.allmovieWrapper}>
        <FiltersPanel/>
        <MoviesPanel onError={()=> setHasError(true)}/>
    </section>
}

export default AllMoviePage