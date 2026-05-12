import { useSearchParams } from "react-router-dom"
import { validCategories } from "../constants"
import type { Category } from "../types"

function useAllMovieParams() {

    const [searchParams, setSearchParams] = useSearchParams()

    const paramGenres = searchParams.get('genres')
    const genres = paramGenres ? paramGenres.split(',').map(Number) : []

    const paramCountry = searchParams.get('country')
    const country = paramCountry ? paramCountry.split(',') : []

    const paramRating = searchParams.get('rating')
    const rating = paramRating ? Number(paramRating) : undefined

    const selectedYears = searchParams.get('selected-years') ?? 'All'

    const paramsPage = searchParams.get('page')
    const page = paramsPage ? Number(paramsPage) : 1

    const paramDateFrom = searchParams.get('from')

    const paramDateTo = searchParams.get('to')

    const releaseDateFrom = paramDateFrom ? `${paramDateFrom}-01-01` : undefined
    const releaseDateTo = paramDateTo ? `${paramDateTo}-12-31` : undefined

    const paramCategory = searchParams.get('category') ?? 'popular'
    const active = (validCategories.includes(paramCategory) ? paramCategory : 'popular') as Category
    

    return { searchParams, setSearchParams, genres, country, rating, selectedYears, page, releaseDateFrom, releaseDateTo, active }
}

export default useAllMovieParams