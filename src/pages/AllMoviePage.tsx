import FiltersPanel from '../components/FiltersPanel'
import MoviesPanel from '../components/MoviesPanel'
import useFetchGenres from '../hooks/useFetchGenres'
import styles from './AllMoviePage.module.css'

function AllMoviePage() {

    const { data: genresData, isLoading, isError } = useFetchGenres()

    if (isLoading) return <div>Завантажується...</div>
    if (isError || !genresData) return <div>Щось пішло не так</div>

    return <section className={styles.allmovieWrapper}>
        <FiltersPanel genresData={genresData}/>
        <MoviesPanel genresData={genresData}/>
    </section>
}

export default AllMoviePage