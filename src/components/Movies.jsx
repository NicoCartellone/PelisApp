import useFavouriteMoviesStore from '../store/favouriteMoviesStore'
import { Toaster, toast } from 'sonner'
import { URL_POSTER_PATH } from '../services/movies'

function ListOfMovies ({ movies }) {
  const addLikedmovie = useFavouriteMoviesStore((state) => state.addLikedmovie)
  const likedMovies = useFavouriteMoviesStore((state) => state.likedMovies)

  const handleLikeMovie = async (movie) => {
    const movieExist = likedMovies.find((m) => m.id === movie.id)
    if (!movieExist) {
      await addLikedmovie(movie)
      toast.success('Película guardada con exito')
    } else {
      toast.error('Película ya guardada')
    }
  }
  return (
    <>
      <Toaster position='top-right' richColors/>
      <ul className="movies">
        {movies.map((movie) => (
          <li className="movie" key={movie.id}>
            <img src={`${URL_POSTER_PATH}${movie.poster_path}`} alt={movie.Title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <button onClick={() => handleLikeMovie(movie)}>Guardar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

function NoMoviesResults () {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies}/>
      : <NoMoviesResults/>
  )
}
