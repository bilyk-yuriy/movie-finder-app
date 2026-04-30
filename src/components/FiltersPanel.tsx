import { type Dispatch, type SetStateAction } from 'react'
import type { Genres, Countries } from '../types'
import styles from './FiltersPanel.module.css'

type FiltersPanelProp = {
    genresData: Genres
    countriesData: Countries
    genres: boolean
    setGenres: Dispatch<SetStateAction<boolean>>
    country: boolean
    setCountry: Dispatch<SetStateAction<boolean>>
    rating: boolean
    setRating: Dispatch<SetStateAction<boolean>>
    years: boolean
    setYears: Dispatch<SetStateAction<boolean>>
    selectedYear: string
    setSelectedYear: Dispatch<SetStateAction<string>>
    yearsFrom: number[]
    yearsTo: number[]
    priorityCountries: string[]
}

function FiltersPanel({ genresData, countriesData, genres, setGenres, country, setCountry,rating, setRating,
     years, setYears, selectedYear, setSelectedYear, yearsFrom,yearsTo, priorityCountries }: FiltersPanelProp) {

    return <div className={styles.genresContainer}>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setGenres(!genres)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setGenres(!genres)} className={styles.title}>GENRES</button>
            </div>
            {genres && <select>
                <option value="All">ALL</option>
                {genresData.genres.map(el =>
                    <option value={el.name}>{el.name}</option>
                )}
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setCountry(!country)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setCountry(!country)} className={styles.title}>COUNTRY</button>
            </div>
            {country && <select>
                {priorityCountries.map(el =>
                    <option value={el}>{el}</option>
                )}
                {countriesData.map(el => {
                    const found = priorityCountries.find(item => item === el.english_name)
                    return !found ? <option value={el.english_name}>{el.english_name}</option> : undefined
                })}
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setRating(!rating)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setRating(!rating)} className={styles.title}>RATING</button>
            </div>
            {rating && <select>
                <option value="all">ALL</option>
                <option value="usa">10</option>
                <option value="uk">9+</option>
                <option value="russia">8+</option>
                <option value="ua">7+</option>
            </select>}
        </div>
        <div>
            <div className={styles.filterHeader}>
                <button onClick={() => setYears(!years)} className={styles.arrowBtn}>
                    <span className={styles.arrow}>⌵</span>
                </button>
                <button onClick={() => setYears(!years)} className={styles.title}>YEARS</button>
            </div>
            {years && <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="All">ALL</option>
                <option value="Select">Select</option>
            </select>}
            {selectedYear === 'Select' && years &&
                <div className={styles.inputYearsContainer}>
                    <input list="yearsSince" type="text" placeholder='from' />
                    <datalist id="yearsSince">
                        {yearsFrom.map(el =>
                            <option value={el} />
                        )}
                    </datalist>
                    <span>—</span>
                    <input list="yearsTo" type="text" placeholder='to' />
                    <datalist id="yearsTo">
                        {yearsTo.map(el =>
                            <option value={el} />
                        )}
                    </datalist>
                </div>
            }
        </div>
    </div>
}

export default FiltersPanel