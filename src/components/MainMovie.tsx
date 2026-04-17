import { useState, useEffect, useMemo } from 'react'
import { useQuery } from "@tanstack/react-query"
import { fetchRunTime, fetchTrendingMovies, fetchGenres } from "../api/tmdb"
import Container from './Container'
import './MainMovie.css'

function MainMovie() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mainMovie'],
        queryFn: fetchTrendingMovies,
        staleTime: 1000 * 60 * 60 
    })
    

    const { data: genresData } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: 1000 * 60 * 60 * 24
    })

    const [randomMovie, setRandomMovie] = useState<number | null>(null)

    const selectedMovieId = randomMovie !== null && data
        ? data.results[randomMovie].id
        : undefined

    const { data: runtimeData } = useQuery({
        queryKey: ['runtime', selectedMovieId],
        queryFn: () => {
            if (selectedMovieId === undefined) throw new Error('No movie id')
            return fetchRunTime(selectedMovieId)
        },
        enabled: selectedMovieId !== undefined,
        staleTime: Infinity
    })

    useEffect(() => {
        if (randomMovie !== null) return
        if (!data) return
        const randomIndex = Math.floor(Math.random() * data.results.length)
        setRandomMovie(randomIndex)
    }, [data])

    const movie = randomMovie !== null && data?.results[randomMovie]

     const movieGenre = useMemo(()=> {
        if(!movie) return []
        return movie.genre_ids.map(el => {
        const foundGenre = genresData?.genres.find(item => item.id === el)
        return foundGenre ? foundGenre.name : null
    }).filter(Boolean)
    }, [movie, genresData])

    if (isLoading) return <div>Завантажується...</div>
    if (isError) return <div>Щось пішло не так...</div>
    if (!movie) return null


    const hours = runtimeData ? Math.floor(runtimeData.runtime / 60) : null
    const minutes = runtimeData ? runtimeData.runtime % 60 : null
    const textRunTime = hours ? `${hours}г ${minutes}хв` : minutes ? `${minutes}хв` : null

    const descriprtion = movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview

    return <>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
        <Container>
            <div className='card-item'>
                <img className='logo' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                <div className='card-info'>
                    <div>{movie.title}</div>
                    <div>{movie.release_date.slice(0, 4)}</div>
                    {textRunTime && <div>{textRunTime}</div>}
                    {movieGenre.length > 0 && <div>• {movieGenre.join(', ')} •</div>}
                    {movie.vote_average > 0 && <div>{`✩ ${movie.vote_average.toFixed(1)}`}</div>}
                    <div>{descriprtion}</div>

                </div>
            </div>
        </Container>
    </>


}

export default MainMovie