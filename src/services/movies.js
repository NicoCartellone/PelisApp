const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const URL_POSTER_PATH = 'https://image.tmdb.org/t/p/w500'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}&language=es-ES&page=1&include_adult=false`)
    const json = await response.json()

    const movies = json.results

    return movies
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
