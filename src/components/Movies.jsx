import useFavouriteMoviesStore from '../store/favouriteMoviesStore'

function ListOfMovies ({ movies }) {
  const addLikedmovie = useFavouriteMoviesStore((state) => state.addLikedmovie)

  const handleLikeMovie = (movie) => {
    addLikedmovie(movie)
  }
  return (
      <ul className="movies">
        {movies.map((movie) => (
          <li className="movie" key={movie.id}>
            <img src={movie.poster} alt={movie.Title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <button onClick={() => handleLikeMovie(movie)}>Like</button>
          </li>
        ))}
      </ul>
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
