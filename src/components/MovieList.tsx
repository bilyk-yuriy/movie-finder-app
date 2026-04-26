import type { MovieWithGenres } from "../types"
import MovieCard from "./MovieCard"

type MovieListProp = {
    movies: MovieWithGenres[]
    variant?: 'default' | 'remove'
}

function MovieList({ movies, variant }: MovieListProp) {

    return <>
        {movies.map(el =>
            <MovieCard key={el.id} item={el} variant={variant} />
        )}
    </>
}

export default MovieList