import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/tmdb'
import { FaRegTrashAlt } from "react-icons/fa";
import type { Genres } from '../types'
import { priorityCountries, longCountries, yearsFrom, yearsTo } from '../constants';
import styles from './FiltersPanel.module.css'

type FiltersPanelProp = {
    genresData: Genres
    genres: number | undefined
    setGenres: Dispatch<SetStateAction<number | undefined>>
    country: string | undefined
    setCountry: Dispatch<SetStateAction<string | undefined>>
    voteAverage: number | undefined
    setVoteAverage: Dispatch<SetStateAction<number | undefined>>
    setReleaseDateFrom: Dispatch<SetStateAction<string | undefined>>
    setReleaseDateTo: Dispatch<SetStateAction<string | undefined>>
}

function FiltersPanel({ genresData, genres, setGenres, country, setCountry,
    voteAverage, setVoteAverage, setReleaseDateFrom, setReleaseDateTo}: FiltersPanelProp) {

    const [selectedYear, setSelectedYear] = useState('All')

    const inputFrom = useRef<HTMLInputElement | null>(null)
    const inputTo = useRef<HTMLInputElement | null>(null)

    const [showGenres, setShowGenres] = useState(true)
    const [showCountry, setShowCountry] = useState(true)
    const [showRating, setShowRating] = useState(true)
    const [showYears, setShowYears] = useState(true)

    const { data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
        staleTime: Infinity
    })

     useEffect(() => {
        if (selectedYear === 'All') {
            setReleaseDateFrom(undefined)
            setReleaseDateTo(undefined)
        }
    }, [selectedYear])

    function applyYears(e: React.SyntheticEvent) {
        e.preventDefault()
        const yearsFromNum = Number(inputFrom.current?.value)
        const yearsToNum = Number(inputTo.current?.value)

        if (inputFrom.current?.value === '' && inputTo.current?.value === '') return

        const finalFrom = yearsFromNum > 0 ? yearsFromNum : 1870
        const finalTo = yearsToNum > 0 ? yearsToNum < finalFrom ? finalFrom : yearsToNum : 2029

        if (inputFrom.current) inputFrom.current.value = String(finalFrom)
        if (inputTo.current) inputTo.current.value = String(finalTo)

        setReleaseDateFrom(`${String(finalFrom)}-01-01`)
        setReleaseDateTo(`${String(finalTo)}-12-31`)
    }

    function clearFilters() {
        setGenres(undefined)
        setCountry(undefined)
        setVoteAverage(undefined)
        setSelectedYear('All')
        setReleaseDateFrom(undefined)
        setReleaseDateTo(undefined)
    }

    if (isCountriesLoading) return <div>Завантажується...</div>
    if (isCountriesError || !countriesData) return <div>Щось пішло не так...</div>

    return <div className={styles.genresContainer}>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setShowGenres(!showGenres)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setShowGenres(!showGenres)} className={styles.title}>GENRES</button>
            </div>
            {showGenres && <select value={genres ?? ''} onChange={(e) => { const val = Number(e.target.value); setGenres(val > 0 ? val : undefined) }}>
                <option value="">ALL</option>
                {genresData.genres.map((el, index) =>
                    <option key={index} value={el.id}>{el.name}</option>
                )}
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setShowCountry(!showCountry)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setShowCountry(!showCountry)} className={styles.title}>COUNTRY</button>
            </div>
            {showCountry && <select value={country ?? ''} onChange={(e) => { const val = e.target.value; setCountry(val ? val : undefined) }}>
                {priorityCountries.map((el, index) =>
                    <option key={index} value={el.iso_3166_1}>{el.english_name}</option>
                )}
                {countriesData.map((el, index) => {
                    const found = priorityCountries.find(item => item.iso_3166_1 === el.iso_3166_1)
                    const shortVersion = longCountries.find(short => short.iso_3166_1 === el.iso_3166_1)
                    return !found ? <option key={index} value={el.iso_3166_1}>{shortVersion ? shortVersion.english_name : el.english_name}</option> : undefined
                })}
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setShowRating(!showRating)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setShowRating(!showRating)} className={styles.title}>RATING</button>
            </div>
            {showRating && <select value={voteAverage ?? ''} onChange={(e) => { const val = Number(e.target.value); setVoteAverage(val > 0 ? val : undefined) }}>
                <option value="">ALL</option>
                <option value="10">10</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setShowYears(!showYears)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setShowYears(!showYears)} className={styles.title}>YEARS</button>
            </div>
            {showYears && <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="All">ALL</option>
                <option value="Select">Select</option>
            </select>}
            {selectedYear === 'Select' && showYears &&
                <>
                    <form onSubmit={applyYears} className={styles.inputYearsContainer}>
                        <div className={styles.inputsRow}>
                            <input ref={inputFrom} list="yearsFrom" type="number" placeholder='from' />
                            <datalist id="yearsFrom">
                                {yearsFrom.map((el, index) =>
                                    <option key={index} value={el} />
                                )}
                            </datalist>
                            <span>—</span>
                            <input ref={inputTo} list="yearsTo" type="number" placeholder='to' />
                            <datalist id="yearsTo">
                                {yearsTo.map((el, index) =>
                                    <option key={index} value={el} />
                                )}
                            </datalist>
                        </div>
                        <button className={styles.applyBtn} onClick={applyYears}>search</button>
                    </form>
                </>
            }

        </div>
        {(genres !== undefined || country !== undefined || voteAverage !== undefined || selectedYear !== 'All') && <button className={styles.clearBtn} onClick={clearFilters}><FaRegTrashAlt fontSize={20} />clear all filters</button>}
    </div>
}

export default FiltersPanel