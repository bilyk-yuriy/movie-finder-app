import type { MovieWithGenres } from "../types"
import MovieCard from "./MovieCard"

type MovieListProp = {
    movies: MovieWithGenres[]
    variant?: 'default' | 'remove'
    showToast?: (movie: MovieWithGenres)=> void
}

function MovieList({ movies, variant, showToast }: MovieListProp) {

    return <>
        {movies.map(el =>
            <MovieCard key={el.id} item={el} variant={variant} showToast={showToast}/>
        )}
    </>
}

export default MovieList