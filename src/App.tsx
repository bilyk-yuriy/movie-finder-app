import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import WatchListPage from "./pages/WatchListPage"
import SearchPage from "./pages/SearchPage"
import MoviePage from "./pages/MoviePage"
import Footer from "./components/Footer"
import { WatchListProvider } from "./contexts/WatchLIstContext"


function App() {

  return <>
    <BrowserRouter>
    <WatchListProvider>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/watch-list' element={<WatchListPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/movie/:id' element={<MoviePage />}/>
      </Routes>
      <Footer></Footer>
      </WatchListProvider>
    </BrowserRouter>

  </>
}

export default App