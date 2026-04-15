export async function fetchTrendingMovies() {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/week', {headers: {'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`}})
    if(!response.ok) {
        throw new Error('Помилка запиту')
    }
    return response.json()
}