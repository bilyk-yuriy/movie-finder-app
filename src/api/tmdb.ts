import type { Movies, Genres, RunTime } from '../types'

async function makeBodyFn(url: string) {
    const response = await fetch(url, {headers: {'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`}})
    if(!response.ok) {
        throw new Error('Помилка запиту')
    }
    return response.json()
}

const BASE_URl = 'https://api.themoviedb.org/3'

export async function fetchTrendingMovies(): Promise<Movies> {
    return makeBodyFn(`${BASE_URl}/trending/movie/week`)
}

export async function fetchGenres(): Promise<Genres> {
    return makeBodyFn(`${BASE_URl}/genre/movie/list`)
}

export async function fetchRunTime(movieId: number): Promise<RunTime> {
   return makeBodyFn(`${BASE_URl}/movie/${movieId}`)
}