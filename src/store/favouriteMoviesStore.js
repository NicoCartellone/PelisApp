import { create } from 'zustand'

export const useFavouriteMoviesStore = create((set) => ({
  likedMovies: [],
  addLikedmovie: (movie) => set((state) => ({ likedMovies: [...state.likedMovies, movie] })),
  removeLikedMovie: (movie) => set((state) => ({ likedMovies: state.likedMovies.filter((m) => m.id !== movie.id) }))
}))

export default useFavouriteMoviesStore
