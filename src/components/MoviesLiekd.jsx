import { useNavigate } from 'react-router-dom'
import useFavouriteMoviesStore from '../store/favouriteMoviesStore'
import { Toaster, toast } from 'sonner'
import { URL_POSTER_PATH } from '../services/movies'
import { formatReleaseDate } from '../utils/deteFomat'

const MoviesLiekd = () => {
  const likedMovies = useFavouriteMoviesStore((state) => state.likedMovies)
  const removeLikedMovie = useFavouriteMoviesStore(
    (state) => state.removeLikedMovie
  )

  const navegate = useNavigate()

  const handleRemoveLikedMovie = async (movie) => {
    try {
      await removeLikedMovie(movie)
      toast.success('Película removida con exito')
    } catch (error) {
      console.log(error)
      toast.error('Error al remover la película')
    }
  }
  return (
    <div className="page">
      <Toaster position="top-right" richColors />
      <h1>🍿 Tus Películas</h1>
      <button onClick={() => navegate('/')}>Buscar Películas</button>
      {likedMovies.length === 0
        ? (
        <h2>Todavia no agregaste películas</h2>
          )
        : (
        <ul className="movies">
          {likedMovies.map((movie) => (
            <li className="movie" key={movie.id}>
              <img
                src={`${URL_POSTER_PATH}${movie.poster}`}
                alt={movie.Title}
              />
              <h3>{movie.title}</h3>
              <p>{formatReleaseDate(movie.year)}</p>
              <button onClick={() => handleRemoveLikedMovie(movie)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
          )}
    </div>
  )
}
export default MoviesLiekd
