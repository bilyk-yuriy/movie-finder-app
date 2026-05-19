import type { MoviePreviewList, MovieDetails, Movie, Genres, Countries } from '../types'
import { BASE_URl } from '../constants'

async function makeBodyFn<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } })
    if (!response.ok) {
        throw new Error('Помилка запиту')
    }
    return response.json()
}

function getParams(page?: number, genreId?: number[], country?: string[], rating?: number, releaseDateFrom?: string, releaseDateTo?: string) {
    const params = new URLSearchParams()
    if (page) params.append('page', String(page))
    if (genreId !== undefined && genreId.length !== 0) params.append('with_genres', String(genreId.join('|')))
    if (country !== undefined && country.length !== 0) params.append('with_origin_country', String(country.join('|')))
    if (rating) params.append('vote_average.gte', String(rating))
    if (releaseDateFrom) params.append('primary_release_date.gte', releaseDateFrom)
    if (releaseDateTo) params.append('primary_release_date.lte', releaseDateTo)
    return params.toString()
}

export async function fetchTrendingMovies(): Promise<MoviePreviewList> {
    return makeBodyFn(`${BASE_URl}/trending/movie/week`)
}

export async function fetchPopularMovies(page?: number, genreId?: number[], country?: string[], rating?: number, releaseDateFrom?: string, releaseDateTo?: string): Promise<MoviePreviewList> {
    const params = getParams(page, genreId, country, rating, releaseDateFrom, releaseDateTo)
    return makeBodyFn(`${BASE_URl}/discover/movie?sort_by=popularity.desc&vote_count.gte=200&without_genres=10770${params ? `&${params}` : ''}`)
}

export async function fetchUpcomingMovies(page?: number, genreId?: number[], country?: string[], rating?: number): Promise<MoviePreviewList> {
    const today = new Date().toISOString().split('T')[0]
    const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const params = getParams(page, genreId, country, rating)
    return makeBodyFn(`${BASE_URl}/discover/movie?primary_release_date.gte=${today}&primary_release_date.lte=${future}&sort_by=popularity.desc&without_genres=99,10770${params ? `&${params}` : ''}`)
}

export async function fetchTopRatedMovies(page?: number, genreId?: number[], country?: string[], rating?: number, releaseDateFrom?: string, releaseDateTo?: string): Promise<MoviePreviewList> {
    const params = getParams(page, genreId, country, rating, releaseDateFrom, releaseDateTo)
    return makeBodyFn(`${BASE_URl}/discover/movie?sort_by=vote_average.desc&vote_count.gte=4000&without_genres=99,10770${params ? `&${params}` : ''}`)
}

export async function fetchMovie(id: number): Promise<MovieDetails> {
    return makeBodyFn(`${BASE_URl}/movie/${id}?append_to_response=recommendations,credits,videos`)
}

export async function fetchFullMovie(movieId: number): Promise<Movie> {
    return makeBodyFn(`${BASE_URl}/movie/${movieId}`)
}

export async function fetchTitleMovie(userText: string): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{
                role: 'user',
                content: `Ти помічник для кіносайту. Виправ назву фільму або знайди її за описом: "${userText}". Напиши ТІЛЬКИ офіційну назву фільму англійською мовою, без лапок, без крапки, без пояснень.`
            }]
        })
    })

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`)

    const data = await response.json()
    return data.choices[0].message.content.trim()
}

export async function fetchSearchMovie(searchQuery: string): Promise<MoviePreviewList> {
    return makeBodyFn(`${BASE_URl}/search/movie?query=${encodeURIComponent(searchQuery)}`)
}

export async function fetchGenres(): Promise<Genres> {
    return makeBodyFn(`${BASE_URl}/genre/movie/list`)
}

export async function fetchCountries(): Promise<Countries> {
    return makeBodyFn(`${BASE_URl}/configuration/countries`)
}




