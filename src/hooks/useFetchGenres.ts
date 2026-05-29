import { useQuery } from "@tanstack/react-query"
import { fetchGenres } from "../api/tmdb"


function useFetchGenres(enable = true) {
    const {data: genresData, isLoading: isGenresLoading, isError: isGenresError, refetch: refetchGenres} = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: Infinity,
        enabled: enable
    })

    return {data: genresData, isLoading: isGenresLoading, isError: isGenresError, refetch: refetchGenres}
}

export default useFetchGenres