import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/tmdb'
import { FaRegTrashAlt } from "react-icons/fa";
import type { Genres } from '../types'
import DropDown from './DropDown';
import { priorityCountries, shortCountries, MIN_YEAR, MAX_YEAR, yearsFrom, yearsTo, ratingOptions } from '../constants';
import useAllMovieParams from '../hooks/useAllMovieParams';
import styles from './FiltersPanel.module.css'

type FiltersPanelProp = {
    genresData: Genres
}

function FiltersPanel({ genresData }: FiltersPanelProp) {

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

    const { searchParams, setSearchParams, genres, country, rating, selectedYears} = useAllMovieParams()

    const [inputFrom, setInputFrom] = useState(searchParams.get('from')?.slice(0, 4) ?? '')
    const [inputTo, setInputTo] = useState(searchParams.get('to')?.slice(0, 4) ?? '')

    function applyYears(e: React.SyntheticEvent) {
        e.preventDefault()
        const yearsFromNum = Number(inputFrom)
        const yearsToNum = Number(inputTo)

        const finalFrom = yearsFromNum > MIN_YEAR && yearsFromNum <= MAX_YEAR ? yearsFromNum : MIN_YEAR
        const finalTo = yearsToNum > 0 ? finalFrom > yearsToNum ? finalFrom : yearsToNum >= MAX_YEAR ? MAX_YEAR : yearsToNum : MAX_YEAR

        setInputFrom(String(finalFrom))
        setInputTo(String(finalTo))

        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('from', `${String(finalFrom)}`)
            params.set('to', `${String(finalTo)}`)
            return params
        })
    }

    function resetOptions(paramKey: string) {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.delete(paramKey)
            return params
        })
        if (paramKey === 'select-years' && selectedYears === 'All') {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev)
                params.delete(paramKey)
                if (paramKey === 'select-years')
                    params.delete('from')
                params.delete('to')
                return params
            })
            if (paramKey === 'select-years') {
                setInputFrom('')
                setInputTo('')
            }
        }
    }

    function clearFilters() {
        setSearchParams(prev => {
            const params = new URLSearchParams()
            params.set('category', prev.get('category') ?? 'popular')
            return params
        })
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

    const yearsFromOptions = yearsFrom.filter(el => String(el).startsWith(inputFrom)).map(item => ({ value: item, name: String(item) }))
    const yearsToOptions = yearsTo.filter(el => String(el).startsWith(inputTo)).map(item => ({ value: item, name: String(item) }))

    function selectGenre(value: number) {
        const found = genres.find(el => el === value)
        const newGenres = found ? genres.filter(el => el !== value) : [...genres, value]
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('genres', newGenres.join(','))
            return params
        })
    }

    function selectCountry(value: string) {
        const found = country.find(el => el === value)
        const newCountry = found ? country.filter(el => el !== value) : [...country, value]
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('country', newCountry.join(','))
            return params
        })
    }

    function selectSingle(value: string, name: string) {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set(name, String(value))
            return params
        })
    }


    const textGenresSelect = genres.length > 1 ? `Selected (${genres.length})` : genres.length === 1 ? genresOptions.find(item => item.value === genres[0])?.name : 'ALL'
    const textCountrySelect = country.length > 1 ? `Selected (${country.length})` : country.length === 1 ? countryOptions.find(item => item.value === country[0])?.name : 'ALL'
    const textRatingSelect = rating ? ratingOptions.find(el => el.value === Number(rating))?.name : 'ALL'
    const textYearsSelect = selectedYears === 'All' ? 'ALL' : 'Select'

    return <div className={styles.filtersContainer}>
        {isVisibleDropDown !== null && <div className={styles.overlay} onClick={() => setIsVisibleDropDown(null)} />}
        <div className={styles.genresContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowGenres(!showGenres); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showGenres ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowGenres(!showGenres); setIsVisibleDropDown(null) }} className={styles.title}>GENRES</button>
            </div>
            {showGenres && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'genre' ? null : 'genre')} className={styles.selectBtn}><span>{textGenresSelect}</span><span className={isVisibleDropDown === 'genre' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'genre' && showGenres && <DropDown options={genresOptions} selectOption={selectGenre} resetOptions={() => resetOptions('genres')} selected={genres} />}
        </div>
        <div className={styles.countryContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowCountry(!showCountry); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showCountry ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowCountry(!showCountry); setIsVisibleDropDown(null) }} className={styles.title}>COUNTRY</button>
            </div>
            {showCountry && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'country' ? null : 'country')} className={styles.selectBtn}><span>{textCountrySelect}</span><span className={isVisibleDropDown === 'country' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'country' && showCountry && <DropDown options={countryOptions} selectOption={selectCountry} resetOptions={() => resetOptions('country')} selected={country} />}
        </div>
        <div className={styles.ratingContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowRating(!showRating); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={`${styles.arrow} ${showRating ? '' : styles.arrowUp}`}>⌵</span>
                </button>
                <button onClick={() => { setShowRating(!showRating); setIsVisibleDropDown(null) }} className={styles.title}>RATING</button>
            </div>
            {showRating && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'rating' ? null : 'rating')} className={styles.selectBtn}><span>{textRatingSelect}</span><span className={isVisibleDropDown === 'rating' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'rating' && showRating && <DropDown isSingleSelect options={ratingOptions} selectOption={(value) => selectSingle(String(value), 'rating')} resetOptions={() => resetOptions('rating')} selected={rating === undefined ? [] : [rating]} closeDropDown={() => setIsVisibleDropDown(null)} />}
        </div>
        <div className={styles.yearsContainer}>
            <div className={styles.filterHeader}>
                <button onClick={() => { setShowYears(!showYears); setIsVisibleDropDown(null) }} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => { setShowYears(!showYears); setIsVisibleDropDown(null) }} className={styles.title}>YEARS</button>
            </div>

            {showYears && <button onClick={() => setIsVisibleDropDown(isVisibleDropDown === 'years' ? null : 'years')} className={styles.selectBtn}><span>{textYearsSelect}</span><span className={isVisibleDropDown === 'years' ? styles.triangleUp : ''}>▾</span></button>}
            {isVisibleDropDown === 'years' && showYears && <DropDown isSingleSelect options={[{ value: 'Select', name: 'Select' }]} selectOption={(value) => selectSingle(value, 'selected-years')} resetOptions={() => resetOptions('selected-years')} selected={selectedYears === 'All' ? [] : [selectedYears]} closeDropDown={() => setIsVisibleDropDown(null)} />}
            {selectedYears === 'Select' && showYears &&
                <>
                    <form onSubmit={applyYears} className={styles.inputYearsContainer}>
                        <div className={styles.inputsRow}>
                            <div className={styles.inputWrapper}>
                                <input value={inputFrom} onChange={(e) => setInputFrom(e.target.value.replace(/[^0-9]/g, ''))} onFocus={() => setIsVisibleDropDown('inputFrom')} type="text" placeholder='from' />
                                {isVisibleDropDown === 'inputFrom' && yearsFromOptions.length > 0 && <DropDown isSingleSelect input options={yearsFromOptions} selectOption={(value) => setInputFrom(String(value))} closeDropDown={() => setIsVisibleDropDown(null)} />}
                            </div>
                            <span>—</span>
                            <div className={styles.inputWrapper}>
                                <input value={inputTo} onChange={(e) => setInputTo(e.target.value.replace(/[^0-9]/g, ''))} onFocus={() => setIsVisibleDropDown('inputTo')} type="text" placeholder='to' />
                                {isVisibleDropDown === 'inputTo' && yearsToOptions.length > 0 && <DropDown isSingleSelect input options={yearsToOptions} selectOption={(value) => setInputTo(String(value))} closeDropDown={() => setIsVisibleDropDown(null)} />}
                            </div>
                        </div>
                        <button className={styles.applyBtn}>search</button>
                    </form>
                </>
            }
        </div>
        {(genres.length !== 0 || country.length !== 0 || rating !== undefined || selectedYears !== 'All') && <button className={styles.clearBtn} onClick={clearFilters}><FaRegTrashAlt fontSize={20} />clear all filters</button>}
    </div>
}

export default FiltersPanel