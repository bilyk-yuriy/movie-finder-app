import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies} from '../api/tmdb'
import MainMovie from "../components/MainMovie"
import MovieSection from "../components/MovieSection"

function HomePage() {

    return <>
        <MainMovie />
        <MovieSection queryKey={'trendingMovie'} queryFn={()=> fetchTrendingMovies(1)} title={'Тренди тиждня'}/>
        <MovieSection queryKey={'popularMovie'} queryFn={()=> fetchPopularMovies(1)} title={'Популярні'}/>
        <MovieSection queryKey={'upcomingMovie'} queryFn={()=> fetchUpcomingMovies(1)} title={'Скоро в кіно'}/>
        <MovieSection queryKey={'topRatedMovie'} queryFn={()=> fetchTopRatedMovies(1)} title={'Топ'}/>
    </>
}

export default HomePage