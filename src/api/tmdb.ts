import type { MoviePreviewList, MovieDetails, Movie, Genres } from '../types'

async function makeBodyFn<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } })
    if (!response.ok) {
        throw new Error('Помилка запиту')
    }
    return response.json()
}

const BASE_URl = 'https://api.themoviedb.org/3'

export async function fetchTrendingMovies(): Promise<MoviePreviewList> {
    return makeBodyFn(`${BASE_URl}/trending/movie/week`)
}

export async function fetchPopularMovies(): Promise<MoviePreviewList> {
    return makeBodyFn(`${BASE_URl}/movie/popular`)
}

export async function fetchUpcomingMovies(): Promise<MoviePreviewList> {
    const today = new Date().toISOString().split('T')[0]
    return makeBodyFn(`${BASE_URl}/discover/movie?primary_release_date.gte=${today}&sort_by=popularity.desc`)
}

export async function fetchTopRatedMovies(): Promise<MoviePreviewList> {
    const [page1, page2, page3] = await Promise.all([
        makeBodyFn<MoviePreviewList>(`${BASE_URl}/movie/top_rated?page=1`),
        makeBodyFn<MoviePreviewList>(`${BASE_URl}/movie/top_rated?page=2`),
        makeBodyFn<MoviePreviewList>(`${BASE_URl}/movie/top_rated?page=3`),
    ])
    return { ...page1, results: [...page1.results, ...page2.results, ...page3.results] }
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
            model: 'llama-3.1-8b-instant',
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

export async function fetchSearchMovie(aiResponse: string): Promise<MoviePreviewList> {
    return makeBodyFn(`${BASE_URl}/search/movie?query=${encodeURIComponent(aiResponse)}`)
}

export async function fetchGenres(): Promise<Genres> {
    return makeBodyFn(`${BASE_URl}/genre/movie/list`)
}
    
    
