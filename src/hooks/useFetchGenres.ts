import { useQuery } from "@tanstack/react-query"
import { fetchGenres } from "../api/tmdb"


function useFetchGenres(enable = true) {
    const {data: genresData, isLoading: isGenresLoading, isError: isGenresError} = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: Infinity,
        enabled: enable
    })

    return {data: genresData, isLoading: isGenresLoading, isError: isGenresError}
}

export default useFetchGenres