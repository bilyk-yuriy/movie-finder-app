import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import WatchListPage from "./pages/WatchListPage"
import SearchPage from "./pages/SearchPage"


function App() {

  return <>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/watch-list' element={<WatchListPage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App