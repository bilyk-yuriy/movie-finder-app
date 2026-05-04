import type { MovieWithGenres } from "../types"
import MovieCard from "./MovieCard"

type MovieListProp = {
    movies: MovieWithGenres[]
    variant?: 'default' | 'remove'
    showToast?: (movie: MovieWithGenres)=> void
    currentPage?: number
    showIndex?: boolean
}

function MovieList({ movies, variant, showToast, showIndex, currentPage }: MovieListProp) {

    return <>
        {movies.map((el, index) =>
            <MovieCard key={el.id} item={el} variant={variant} currentPage={currentPage} showToast={showToast} showIndex={showIndex ? index : undefined} />
        )}
    </>
}

export default MovieList