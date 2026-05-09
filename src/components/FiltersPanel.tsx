import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/tmdb'
import { FaRegTrashAlt } from "react-icons/fa";
import type { Genres } from '../types'
import DropDown from './DropDown';
import { priorityCountries, shortCountries, yearsFrom, yearsTo, ratingOptions } from '../constants';
import styles from './FiltersPanel.module.css'

type FiltersPanelProp = {
    genresData: Genres
    genres: number[]
    setGenres: Dispatch<SetStateAction<number[]>>
    country: string[]
    setCountry: Dispatch<SetStateAction<string[]>>
    voteAverage: number | undefined
    setVoteAverage: Dispatch<SetStateAction<number | undefined>>
    setReleaseDateFrom: Dispatch<SetStateAction<string | undefined>>
    setReleaseDateTo: Dispatch<SetStateAction<string | undefined>>
}

function FiltersPanel({ genresData, genres, setGenres, country, setCountry,
    voteAverage, setVoteAverage, setReleaseDateFrom, setReleaseDateTo }: FiltersPanelProp) {

    const [selectedYear, setSelectedYear] = useState<'All' | 'Select'>('All')

    const [inputFrom, setInputFrom] = useState('')
    const [inputTo, setInputTo] = useState('')

    const [showGenres, setShowGenres] = useState(true)
    const [showCountry, setShowCountry] = useState(true)
    const [showRating, setShowRating] = useState(true)
    const [showYears, setShowYears] = useState(true)

    const [isVisibleDropDown, setIsVisibleDropDown] = useState<'genre' | 'country' | 'rating' | 'years' | 'inputFrom' | 'inputTo' | null>(null)

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
        const yearsFromNum = Number(inputFrom)
        const yearsToNum = Number(inputTo)

        if (!inputFrom && !inputTo) return

        const finalFrom = yearsFromNum > 1870 ? yearsFromNum : 1870
        const finalTo = yearsToNum > 0 ? finalFrom > yearsToNum ? finalFrom : yearsToNum > 2029 ? 2029 : yearsFromNum : 2029

        console.log(finalFrom, finalTo)

        setInputFrom(String(finalFrom))
        setInputTo(String(finalTo))

        setReleaseDateFrom(`${String(finalFrom)}-01-01`)
        setReleaseDateTo(`${String(finalTo)}-12-31`)
    }

    function clearFilters() {
        setGenres([])
        setCountry([])
        setVoteAverage(undefined)
        setSelectedYear('All')
        setReleaseDateFrom(undefined)
        setReleaseDateTo(undefined)
        setInputFrom('')
        setInputTo('')
    }

    if (isCountriesLoading) return <div>Завантажується...</div>
    if (isCountriesError || !countriesData) return <div>Щось пішло не так...</div>

    const genresOptions = genresData.genres.map(el => ({ value: el.id, name: el.name }))
    const priorityOptions = priorityCountries.map(el => ({ value: el.iso_3166_1, name: el.english_name }))
    const otherOptions = countriesData.map(el => {
        const found = priorityCountries.find(item => item.iso_3166_1 === el.iso_3166_1)
        const shortVersion = shortCountries.find(short => short.iso_3166_1 === el.iso_3166_1)?.english_name
        return found ? undefined : { value: el.iso_3166_1, name: shortVersion ?? el.english_name }
    }).filter(el => el !== undefined)
    const countryOptions = [...priorityOptions, ...otherOptions]
    const yearsFromOptions = yearsFrom.filter(el=> String(el).startsWith(inputFrom)).map(item=> ({value: item, name: String(item)}))
    const yearsToOptions = yearsTo.filter(el=> String(el).startsWith(inputTo)).map(item=> ({value: item, name: String(item)}))

    function selectGenre(value: number) {
        const found = genres.find(el => el === value)
        found ? setGenres(genres.filter(el => el !== value)) : setGenres([...genres, value])
    }

    function selectCountry(value: string) {
        const found = country.find(el => el === value)
        found ? setCountry(country.filter(el => el !== value)) : setCountry([...country, value])
    }

    const textGenresSelect = genres.length > 1 ? `Selected (${genres.length})` : genres.length === 1 ? genresOptions.find(item => item.value === genres[0])?.name : 'ALL'
    const textCountrySelect = country.length > 1 ? `Selected (${country.length})` : country.length === 1 ? countryOptions.find(item => item.value === country[0])?.name : 'ALL'
    const textRatingSelect = voteAverage ? ratingOptions.find(el => el.value === voteAverage)?.name : 'ALL'
    const textYearsSelect = selectedYear === 'All' ? 'ALL' : 'Select'

    return <div className={styles.filtersContainer}>
        {isVisibleDropDown !== null && <div className={styles.overlay} onClick={()=> setIsVisibleDropDown(null)}/>}
        <div className={styles.genresContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowGenres(!showGenres); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showGenres ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowGenres(!showGenres); setIsVisibleDropDown(null) }} className={styles.title}>GENRES</button>
            </div>
            {showGenres && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'genre' ? null : 'genre')} className={styles.selectBtn}><span>{textGenresSelect}</span><span className={isVisibleDropDown === 'genre' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'genre' && showGenres && <DropDown options={genresOptions} selectOption={selectGenre} resetOptions={() => setGenres([])} selected={genres} />}
        </div>
        <div className={styles.countryContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowCountry(!showCountry); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showCountry ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowCountry(!showCountry); setIsVisibleDropDown(null) }} className={styles.title}>COUNTRY</button>
            </div>
            {showCountry && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'country' ? null : 'country')} className={styles.selectBtn}><span>{textCountrySelect}</span><span className={isVisibleDropDown === 'country' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'country' && showCountry && <DropDown options={countryOptions} selectOption={selectCountry} resetOptions={() => setCountry([])} selected={country} />}
        </div>
        <div className={styles.ratingContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowRating(!showRating); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showRating ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowRating(!showRating); setIsVisibleDropDown(null) }} className={styles.title}>RATING</button>
            </div>
            {showRating && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'rating' ? null : 'rating')} className={styles.selectBtn}><span>{textRatingSelect}</span><span className={isVisibleDropDown === 'rating' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'rating' && showRating && <DropDown isSingleSelect options={ratingOptions} selectOption={setVoteAverage} resetOptions={() => setVoteAverage(undefined)} selected={voteAverage === undefined ? [] : [voteAverage]} closeDropDown={() => setIsVisibleDropDown(null)} />}
        </div>
        <div className={styles.yearsContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowYears(!showYears); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => { setShowYears(!showYears); setIsVisibleDropDown(null) }} className={styles.title}>YEARS</button>
            </div>

            {showYears && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'years' ? null : 'years')} className={styles.selectBtn}><span>{textYearsSelect}</span><span className={isVisibleDropDown === 'years' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'years' && showYears && <DropDown isSingleSelect options={[{ value: 'Select', name: 'Select' }]} selectOption={setSelectedYear} resetOptions={() => setSelectedYear('All')} selected={selectedYear === 'All' ? [] : [selectedYear]} closeDropDown={() => setIsVisibleDropDown(null)} />}
            {selectedYear === 'Select' && showYears &&
                <>
                    <form onSubmit={applyYears} className={styles.inputYearsContainer}>
                        <div className={styles.inputsRow}>  
                            <div className={styles.inputWrapper}>
                                <input value={inputFrom} onChange={(e) => setInputFrom(e.target.value.replace(/[^0-9]/g, ''))} onFocus={()=> setIsVisibleDropDown('inputFrom')}  type="text" placeholder='from' />
                                {isVisibleDropDown === 'inputFrom' && yearsFromOptions.length > 0 && <DropDown isSingleSelect input options={yearsFromOptions} selectOption={(value)=> setInputFrom(String(value))} closeDropDown={()=> setIsVisibleDropDown(null)} />}
                            </div>
                            <span>—</span>
                            <div className={styles.inputWrapper}>
                                <input value={inputTo} onChange={(e)=> setInputTo(e.target.value.replace(/[^0-9]/g, ''))} onFocus={()=> setIsVisibleDropDown('inputTo')} type="text" placeholder='to' />
                                {isVisibleDropDown === 'inputTo' && yearsToOptions.length > 0 && <DropDown isSingleSelect input options={yearsToOptions} selectOption={(value) =>  setInputTo(String(value))} closeDropDown={()=> setIsVisibleDropDown(null)}/>}
                            </div>
                        </div>
                        <button className={styles.applyBtn}>search</button>
                    </form>
                </>
            }
        </div>
        {(genres.length !== 0 || country.length !== 0 || voteAverage !== undefined || selectedYear !== 'All') && <button className={styles.clearBtn} onClick={clearFilters}><FaRegTrashAlt fontSize={20} />clear all filters</button>}
    </div>
}

export default FiltersPanel
