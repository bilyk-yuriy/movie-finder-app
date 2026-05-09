import { useState } from 'react'
import FiltersPanel from '../components/FiltersPanel'
import MoviesPanel from '../components/MoviesPanel'
import useFetchGenres from '../hooks/useFetchGenres'
import styles from './AllMoviePage.module.css'

function AllMoviePage() {

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres()

    const [genres, setGenres] = useState<number[]>([])
    const [country, setCountry] = useState<string[]>([])
    const [voteAverage, setVoteAverage] = useState<number | undefined>(undefined)
    const [releaseDateFrom, setReleaseDateFrom] = useState<string | undefined>(undefined)
    const [releaseDateTo, setReleaseDateTo] = useState<string | undefined>(undefined)

    if (isGenresLoading) return <div>Завантажується...</div>
    if (isGenresError || !genresData) return <div>Щось пішло не так</div>

    return <section className={styles.allmovieWrapper}>
        <FiltersPanel
            genresData={genresData}
            genres={genres}
            setGenres={setGenres}
            country={country}
            setCountry={setCountry}
            voteAverage={voteAverage}
            setVoteAverage={setVoteAverage}
            setReleaseDateFrom={setReleaseDateFrom}
            setReleaseDateTo={setReleaseDateTo}
        />
        <MoviesPanel
            genres={genres}
            country={country}
            voteAverage={voteAverage}
            releaseDateFrom={releaseDateFrom}
            releaseDateTo={releaseDateTo}
        />
    </section>
}

export default AllMoviePage