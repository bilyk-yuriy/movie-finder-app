import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { fetchTitleMovie, fetchSearchMovie } from "../../api/tmdb"
import MovieList from '../../components/MovieList'
import Container from "../../components/Container"
import useFetchGenres from "../../hooks/useFetchGenres"
import ErrorFallback from "../../components/ErrorFallback"
import SkeletonSearchPage from "./SkeletonSearchPage"
import styles from './SearchPage.module.css'

function SearchPage() {

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

    const { data: ai, isLoading: isAiLoading, isError: isAiError } = useQuery({
        queryKey: ['titleMovie', query],
        queryFn: () => {
            if (!query) throw new Error('No query')
            return fetchTitleMovie(query)
        },
        enabled: !!query,
        staleTime: Infinity,
    })

    const { data, isLoading, isError } = useQuery({
        queryKey: ['searchMovie', ai],
        queryFn: () => {
            if (ai === undefined) throw new Error('No ai response')
            return fetchSearchMovie(ai)
        },
        staleTime: Infinity,
        enabled: !!ai
    })

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useFetchGenres(!!ai)

    if (isAiLoading || isLoading || isGenresLoading) return <SkeletonSearchPage />
    if (isAiError || isError || isGenresError || !data || !genresData) return <ErrorFallback />

    const movies = data.results.map(el => ({
        ...el, genres: el.genre_ids.map(id => genresData?.genres.find(item => item.id === id)?.name ?? '').filter(Boolean)
    }))

    return <section className={styles.searchpageWrapper}>
        <Container>
            {data.results.length === 0
                ? <h2>No results found for: "{query}"</h2>
                : <>
                    <h2 className={styles.title}>Search results for: "{query}"</h2>
                    <MovieList movies={movies} />
                </>}
        </Container>
    </section>

}

export default SearchPage