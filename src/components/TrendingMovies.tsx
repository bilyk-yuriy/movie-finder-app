import { useQuery } from '@tanstack/react-query'
import { fetchTrendingMovies } from "../api/tmdb"
import Container from './Container'
import CardList from './CardList'
import './TrendingMovies.css'


function TrendingMovies() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mainMovie'],
        queryFn: fetchTrendingMovies
    })

    if (isLoading) return <div>Завантажується...</div>
    if (isError) return <div>Щось пішло не так...</div>

    return <section className='trendingmovie-wrapper'>
        <Container wide>
            <h2>Тренди тиждня</h2>
            <CardList movies={data?.results ?? []} />
        </Container>
    </section>
}

export default TrendingMovies