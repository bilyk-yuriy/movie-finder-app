import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/tmdb'
import MainMovie from "../components/MainMovie/MainMovie"
import MovieSection from "../components/MovieSection/MovieSection"
import ErrorFallback from '../components/ErrorFallback'

function HomePage() {

    const [timeWindow, setTimeWindow] = useState<'week' | 'day'>(() => {
        const saved = localStorage.getItem('timeWindow')
        return saved ? JSON.parse(saved) : 'week'
    })

    const trending = useQuery({ queryKey: ['trendingMovie', timeWindow], queryFn: () => fetchTrendingMovies(timeWindow)})
    const popular = useQuery({ queryKey: ['popularMovie'], queryFn: () => fetchPopularMovies()})
    const upcoming = useQuery({ queryKey: ['upcoming'], queryFn: () => fetchUpcomingMovies()})
    const topRated = useQuery({ queryKey: ['topRatedMovie'], queryFn: () => fetchTopRatedMovies()})

    useEffect(()=> {
        localStorage.setItem('timeWindow', JSON.stringify(timeWindow))
    }, [timeWindow])

    function toggleTimeWindow() {
        timeWindow === 'week' ? setTimeWindow('day') : setTimeWindow('week')
    }

    const allQueries = [trending, popular, upcoming, topRated]
    const noCache = allQueries.every(q=> q.data === undefined)
    const allFailed = allQueries.every(q=> q.isError)

    if (noCache && allFailed) return <ErrorFallback/>

    return <>
        <MainMovie />
        <MovieSection queryKey={['trendingMovie', timeWindow]} queryFn={() => fetchTrendingMovies(timeWindow)} title={'Trending this'} category={'trending'} timeWindow={timeWindow} toggleTimeWindow={toggleTimeWindow} />
        <MovieSection queryKey={['popularMovie']} queryFn={() => fetchPopularMovies()} title={'Popular'} category={'popular'} />
        <MovieSection queryKey={['upcomingMovie']} queryFn={() => fetchUpcomingMovies()} title={'Upcoming'} category={'upcoming'} />
        <MovieSection queryKey={['topRatedMovie']} queryFn={() => fetchTopRatedMovies()} title={'Top Rated'} category={'top'} />
    </>
}

export default HomePage