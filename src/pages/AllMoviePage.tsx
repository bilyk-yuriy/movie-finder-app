import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/tmdb'
import FiltersPanel from '../components/FiltersPanel'
import useFetchGenres from '../hooks/useFetchGenres'
import styles from './AllMoviePage.module.css'

function AllMoviePage() {

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres()

    const { data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
        staleTime: Infinity
    })

    const [genres, setGenres] = useState(true)
    const [country, setCountry] = useState(true)
    const [rating, setRating] = useState(true)
    const [years, setYears] = useState(true)
    const [selectedYear, setSelectedYear] = useState('All')

    const yearsFrom = [2000, 1990, 1980, 1970, 1960, 1950, 1900]
    const yearsTo = [2025, 2024, 2023, 2022, 2021, 2020, 2015, 2010]

    const priorityCountries = ['ALL', 'United States of America', 'United Kingdom', 'France', 'Italy', 'Germany', 'Ukraine', 'Soviet Union', 'Russia',]

    if (isGenresLoading || isCountriesLoading) return <div>Завантажується...</div>
    if (isGenresError || isCountriesError || !genresData || !countriesData) return <div>Щось пішло не так</div>

    return <section className={styles.allmovieWrapper}>
        <FiltersPanel
            genresData={genresData}
            countriesData={countriesData}
            genres={genres}
            setGenres={setGenres}
            country={country}
            setCountry={setCountry}
            rating={rating}
            setRating={setRating}
            years={years}
            setYears={setYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            yearsFrom={yearsFrom}
            yearsTo={yearsTo}
            priorityCountries={priorityCountries} />
    </section>
}

export default AllMoviePage