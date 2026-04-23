export type MoviePreviewList = {
    results: MoviePreview[]
}

export type MoviePreview = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    title: string,
    original_title: string,
    overview: string,
    poster_path: string,
    media_type: string,
    original_language: string,
    genre_ids: number[],
    popularity: number,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type Movie = MoviePreview & {
    genres: Genre[],
    runtime: number,
}

export type MovieDetails = Movie & {
    recommendations: { results: Movie[] },
    credits: { cast: Actor[] },
    videos: { results: Video[] },
}

export type Genre = {
    name: string
}

type Actor = {
    name: string,
    character: string,
    profile_path: string | null

}

type Video = {
    key: string,
    type: string,
    official: boolean
}
