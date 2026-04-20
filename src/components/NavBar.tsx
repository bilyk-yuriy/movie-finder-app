import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci"
import Container from './Container'
import styles from './NavBar.module.css'


function NavBar() {

    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    function onSearch(e: React.SyntheticEvent) {
        e.preventDefault()
        if (inputRef.current === null || !inputRef.current.value) return
        navigate(`/search?q=${inputRef.current.value}`)
        inputRef.current.value = ''
    }

    return <>
        <div className={styles.navbarWrapper}>
            <Container>
                <nav className={styles.navbar}>
                    <Link to='/'><h1 className={styles.logo} >MovieZone</h1></Link>
                    <form onSubmit={onSearch} className={styles.searchForm}>
                        <input className={styles.searchInput} ref={inputRef} type="text" placeholder="search movies..." />
                        <button className={styles.searchBtn} type='submit'><CiSearch fontSize={24} /></button>
                    </form>
                    <div className={styles.navActions}>
                        <Link className={styles.navLink} to='/watch-list'>WatchList</Link>
                        <button className={styles.loginBtn}>Login</button>
                    </div>
                </nav>
            </Container>
        </div>
    </>
}

export default NavBar