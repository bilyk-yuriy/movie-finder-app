import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies} from '../api/tmdb'
import MainMovie from "../components/MainMovie"
import MovieSection from "../components/MovieSection"

function HomePage() {

    return <>
        <MainMovie />
        <MovieSection queryKey={'trendingMovie'} queryFn={fetchTrendingMovies} title={'Trending week'}/>
        <MovieSection queryKey={'popularMovie'} queryFn={()=> fetchPopularMovies()} title={'Popular'}/>
        <MovieSection queryKey={'upcomingMovie'} queryFn={()=> fetchUpcomingMovies()} title={'Upcoming'}/>
        <MovieSection queryKey={'topRatedMovie'} queryFn={()=> fetchTopRatedMovies()} title={'Top'}/>
    </>
}

export default HomePage