import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import WatchListPage from "./pages/WatchListPage"
import AllMoviePage from "./pages/AllMoviePage"
import SearchPage from "./pages/SearchPage"
import MoviePage from "./pages/MoviePage"
import Footer from "./components/Footer"
import { WatchListProvider } from "./contexts/WatchListContext"
import './App.css'


function App() {

  return <BrowserRouter>
    <WatchListProvider>
      <div className='layout'>
        <NavBar></NavBar>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/all-movie' element={<AllMoviePage />} />
            <Route path='/watch-list' element={<WatchListPage />} />
            <Route path='/movie/:id' element={<MoviePage />} />
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </WatchListProvider>
  </BrowserRouter>
}

export default App