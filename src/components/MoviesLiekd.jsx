import useFavouriteMoviesStore from '../store/favouriteMoviesStore'
const MoviesLiekd = () => {
  const likedMovies = useFavouriteMoviesStore((state) => state.likedMovies)
  const removeLikedMovie = useFavouriteMoviesStore((state) => state.removeLikedMovie)

  const handleRemoveLikedMovie = (movie) => {
    removeLikedMovie(movie)
  }
  return (
    <ul className="movies">
    {likedMovies.map((movie) => (
      <li className="movie" key={movie.id}>
        <img src={movie.poster} alt={movie.Title} />
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <button onClick={() => handleRemoveLikedMovie(movie)}>dislike</button>
      </li>
    ))}
  </ul>
  )
}
export default MoviesLiekd
