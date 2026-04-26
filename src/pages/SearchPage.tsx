import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { fetchTitleMovie, fetchSearchMovie, fetchGenres } from "../api/tmdb"
import MovieList from '../components/MovieList'
import Container from "../components/Container"
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
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const { data, isLoading, isError } = useQuery({
        queryKey: ['searchMovie', ai],
        queryFn: () => {
            if (ai === undefined) throw new Error('No ai response')
            return fetchSearchMovie(ai)
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!ai
    })

    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: 1000 * 60 * 60 * 24,
        enabled: !!ai
    })


    if (isAiLoading || isLoading || isGenresLoading) return <div>Завантажується...</div>
    if (isAiError || isError || isGenresError || !data) return <div>Щось пішло не так...</div>

    const movies = data.results.map(el => ({
        ...el, genres: el.genre_ids.map(id => genresData?.genres.find(item => item.id === id)?.name ?? '').filter(Boolean)
    }))

    return <section className={styles.searchpageWrapper}>
        <Container>
            {data.results.length === 0
                ? <h2>Sorry, i can't find anything in query "{query}"</h2>
                : <> 
                <h2 className={styles.title}>search: {query}</h2>
                <MovieList movies={movies} />
                </>}
        </Container>
    </section>

}

export default SearchPage