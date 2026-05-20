import { useState, useEffect } from 'react'
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/tmdb'
import MainMovie from "../components/MainMovie"
import MovieSection from "../components/MovieSection"

function HomePage() {

    const [timeWindow, setTimeWindow] = useState<'week' | 'day'>(() => {
        const saved = localStorage.getItem('timeWindow')
        return saved ? JSON.parse(saved) : 'week'
    })

    useEffect(()=> {
        localStorage.setItem('timeWindow', JSON.stringify(timeWindow))
    }, [timeWindow])

    function toggleTimeWindow() {
        timeWindow === 'week' ? setTimeWindow('day') : setTimeWindow('week')
    }

    return <>
        <MainMovie />
        <MovieSection queryKey={['trendingMovie', timeWindow]} queryFn={() => fetchTrendingMovies(timeWindow)} title={'Trending this'} trending timeWindow={timeWindow} toggleTimeWindow={toggleTimeWindow} />
        <MovieSection queryKey={['popularMovie']} queryFn={() => fetchPopularMovies()} title={'Popular'} />
        <MovieSection queryKey={['upcomingMovie']} queryFn={() => fetchUpcomingMovies()} title={'Upcoming'} upcoming />
        <MovieSection queryKey={['topRatedMovie']} queryFn={() => fetchTopRatedMovies()} title={'Top Rated'} />
    </>
}

export default HomePage