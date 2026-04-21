import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import WatchListPage from "./pages/WatchListPage"
import SearchPage from "./pages/SearchPage"
import MoviePage from "./pages/MoviePage"
import Footer from "./components/Footer"


function App() {

  return <>
    <BrowserRouter>
      <NavBar></NavBar>
      {/* <main style={{marginTop: '70px'}}> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/watch-list' element={<WatchListPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/movie/:id' element={<MoviePage />}/>
      </Routes>
      {/* </main> */}
      <Footer></Footer>
    </BrowserRouter>

  </>
}

export default App