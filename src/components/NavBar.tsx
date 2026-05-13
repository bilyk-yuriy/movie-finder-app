import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci"
import Container from './Container'
import DropDown from './DropDown'
import styles from './NavBar.module.css'


function NavBar() {

    const [inputValue, setInputValue] = useState('')
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false)
    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('history')
        return saved ? JSON.parse(saved) : []
    })
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history])

    function onSearch(e: React.SyntheticEvent) {
        e.preventDefault()
        if (inputValue === '') return
        navigate(`search?q=${inputValue}`)
        setHistory(prev=> [inputValue, ...prev].slice(0, 5))
        setInputValue('')
        setIsVisibleDropDown(false)
        inputRef.current?.blur()
    }

    const historyOptions = history.map(el => ({ value: el, name: el }))

    function selectOption(value: string) {
        setIsVisibleDropDown(false)
        navigate(`search?q=${value}`)
        setInputValue('')
        inputRef.current?.blur()
    }

    function removeOption(value: string) {
        setHistory(history.filter(el => el !== value))
    }

    return <>
        <div className={styles.navbarWrapper}>
            <Container>
                <nav className={styles.navbar}>
                    <Link to='/'><h1 className={styles.logo} >MovieZone</h1></Link>
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
                                {isVisibleDropDown && history.length !== 0 && <DropDown isSingleSelect search options={historyOptions} selectOption={selectOption} removeOption={removeOption} />}
                            </div>
                        </form>
                    </div>
                    <div className={styles.navActions}>
                        <Link className={styles.navLink} to='/all-movie'>Movie</Link>
                        <Link className={styles.navLink} to='/watch-list'>WatchList</Link>
                        <button className={styles.loginBtn}>Login</button>
                    </div>
                </nav>
            </Container>
        </div>
    </>
}

export default NavBar