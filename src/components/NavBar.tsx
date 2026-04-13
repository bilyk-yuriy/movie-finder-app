import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci"
import Container from './Container'
import './NavBar.css'


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
        <div className='navbar-wrapper'>
            <Container>
                <nav className="navbar">
                    <Link to='/'><h1 className='logo' >КіноЗона</h1></Link>
                    <form onSubmit={onSearch} className='search-form'>
                        <input className='search-input' ref={inputRef} type="text" placeholder="пошук фільму..." />
                        <button className='search-button' type='submit'><CiSearch fontSize={24}/></button>
                    </form>
                    <Link className='nav-link' to='/watch-list'>Вотчліст</Link>
                </nav>
            </Container>
        </div>
    </>
}

export default NavBar