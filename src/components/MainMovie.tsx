import { useQuery } from "@tanstack/react-query"
import { fetchTrendingMovies } from "../api/tmdb"

function MainMovie() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mainMovie'],
        queryFn: fetchTrendingMovies
    })

    console.log('loading', isLoading)

    return <>
        {isLoading && <div>Завантажується...</div>}
        {isError && <div>Щось пішло не так...</div>}
        {data && JSON.stringify(data)}
    </>
}

export default MainMovie