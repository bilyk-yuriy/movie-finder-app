import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies} from '../api/tmdb'
import MainMovie from "../components/MainMovie"
import MovieSection from "../components/MovieSection"

function HomePage() {

    return <>
        <MainMovie />
        <MovieSection queryKey={'trendingMovie'} queryFn={fetchTrendingMovies} title={'Тренди тиждня'}/>
        <MovieSection queryKey={'popularMovie'} queryFn={fetchPopularMovies} title={'Популярні'}/>
        <MovieSection queryKey={'upcomingMovie'} queryFn={fetchUpcomingMovies} title={'Скоро в кіно'}/>
        <MovieSection queryKey={'topRatedMovie'} queryFn={fetchTopRatedMovies} title={'Топ'}/>
    </>
}

export default HomePage