import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { CiSearch } from "react-icons/ci"
import Container from './Container'
import DropDown from './DropDown'
import { fetchSearchMovie } from '../api/tmdb'
import styles from './NavBar.module.css'
import { useQuery } from '@tanstack/react-query'


function NavBar() {

    const [inputValue, setInputValue] = useState('')
    const [debouncedValue] = useDebounceValue(inputValue, 400)
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false)
    const [history, setHistory] = useState<{ value: string, name: string, poster?: string }[]>(() => {
        const saved = localStorage.getItem('history')
        return saved ? JSON.parse(saved) : []
    })
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const { pathname } = useLocation()

    const isAllowed = (text: string) => /^[a-zA-Z0-9\s\-:]+$/.test(text)

    const { data: titleMovieData } = useQuery({
        queryKey: ['suggestions', debouncedValue],
        queryFn: () => fetchSearchMovie(debouncedValue),
        enabled: debouncedValue.length >= 3 && isAllowed(debouncedValue)
    })

    const suggestions = titleMovieData?.results.filter(el => el.vote_count > 500).slice(0, 5).map(item => ({ title: item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title, poster: item.poster_path }))

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history])

    function onSearch(e: React.SyntheticEvent) {
        e.preventDefault()
        if (inputValue === '') return
        navigate(`search?q=${inputValue}`)
        setHistory(prev => {
            const filtered = prev.filter(el=> el.value !== inputValue)
            return [{value: inputValue, name: inputValue}, ... filtered].slice(0, 5)
        })
    setInputValue('')
    setIsVisibleDropDown(false)
    inputRef.current?.blur()
}

const historyOptions = history.filter(el => el.value?.toLowerCase().includes(inputValue.toLowerCase())).map(item => ({ value: item.value, name: item.name, isHistory: true, poster: item.poster }))
const suggestionsOptions = suggestions?.map(el => ({ value: el.title, name: el.title, poster: el.poster }))
const options = [...suggestionsOptions ?? [], ...historyOptions]

function selectOption(value: string, poster?: string) {
    setIsVisibleDropDown(false)
    navigate(`search?q=${value}`)
    setHistory(prev => {
            const filtered = prev.filter(el=> el.value !== value)
            return [{value: value, name: value, poster: poster}, ... filtered].slice(0, 5)
        })
    setInputValue('')
    inputRef.current?.blur()
}

function removeOption(value: string) {
    setHistory(history.filter(el => el.value !== value))
}

return <>
    <div className={styles.navbarWrapper}>
        <Container>
            <nav className={styles.navbar}>
                <Link to='/'><h1 className={styles.logo}>MovieZone</h1></Link>
                <div className={styles.searchWrapper}>
                    <form onSubmit={onSearch} className={styles.searchForm}>
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onFocus={() => setIsVisibleDropDown(true)}
                            onBlur={() => setIsVisibleDropDown(false)}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={styles.searchInput}
                            type="text"
                            placeholder="search movies..." />
                        <button className={styles.searchBtn} type='submit'><CiSearch fontSize={24} /></button>
                        <div onMouseDown={(e) => e.preventDefault()}>
                            {isVisibleDropDown && options.length !== 0 &&
                                <DropDown isSingleSelect search
                                    options={options}
                                    selectOption={selectOption}
                                    removeOption={removeOption}
                                />}
                        </div>
                    </form>
                </div>
                <div className={styles.navActions}>
                    <Link className={`${pathname === '/all-movie' ? styles.navLinkActive : styles.navLink}`} to='/all-movie'>Movie</Link>
                    <Link className={`${pathname === '/watch-list' ? styles.navLinkActive : styles.navLink}`} to='/watch-list'>WatchList</Link>
                </div>
            </nav>
        </Container>
    </div>
</>
}

export default NavBar