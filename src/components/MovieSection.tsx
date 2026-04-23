import { useQuery } from '@tanstack/react-query'
import type { MoviePreviewList } from '../types'
import Container from './Container'
import CardList from './CardList'
import './MovieSection.css'


type MovieSectionProp = {
    queryKey: string,
    queryFn: () => Promise<MoviePreviewList>,
    title: string,
}

function MovieSection({queryKey, queryFn, title}: MovieSectionProp) {

    const { data, isLoading, isError } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFn
    })

    if (isLoading) return <div>Завантажується...</div>
    if (isError) return <div>Щось пішло не так...</div>

    return <section className='moviesection-wrapper'>
        <Container wide>
            <h2>{title}</h2>
            <CardList movies={data?.results ?? []} />
        </Container>
    </section>
}

export default MovieSection