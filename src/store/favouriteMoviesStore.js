import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavouriteMoviesStore = create(
  persist((set) => ({
    likedMovies: [],
    addLikedmovie: (movie) =>
      set((state) => (
        { likedMovies: [...state.likedMovies, movie] })),
    removeLikedMovie: (movie) =>
      set((state) => ({
        likedMovies: state.likedMovies.filter((m) => m.id !== movie.id)
      }))
  }), {
    name: 'likedMoviesStore'
  })
)

export default useFavouriteMoviesStore
