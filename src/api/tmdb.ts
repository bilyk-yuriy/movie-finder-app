import type { Movies, Genres, RunTime } from '../types'

async function makeBodyFn<T>(url: string): Promise<T> {
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

export async function fetchPopularMovies(): Promise<Movies> {
    return makeBodyFn(`${BASE_URl}/movie/popular`)
}

export async function fetchUpcomingMovies(): Promise<Movies> {
    const today = new Date().toISOString().split('T')[0]
    return makeBodyFn(`${BASE_URl}/discover/movie?primary_release_date.gte=${today}&sort_by=popularity.desc`)
}

export async function fetchTopRatedMovies(): Promise<Movies> {
    const [page1, page2, page3] = await Promise.all([
        makeBodyFn<Movies>(`${BASE_URl}/movie/top_rated?page=1`),
        makeBodyFn<Movies>(`${BASE_URl}/movie/top_rated?page=2`),
        makeBodyFn<Movies>(`${BASE_URl}/movie/top_rated?page=3`),
    ])
    return {...page1, results: [...page1.results, ...page2.results, ...page3.results]}
}

export async function fetchGenres(): Promise<Genres> {
    return makeBodyFn(`${BASE_URl}/genre/movie/list`)
}

export async function fetchRunTime(movieId: number): Promise<RunTime> {
   return makeBodyFn(`${BASE_URl}/movie/${movieId}`)
}