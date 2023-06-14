import '../App.css'
import { useMovies } from '../hooks/useMovies'
import { Movies } from '../components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { useNavigate } from 'react-router-dom'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function Home () {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const navegate = useNavigate()

  useEffect(() => {
    getMovies({ search: 'avengers' })
  }, [])

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">
      <h1>🍿 Tus Películas</h1>
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder="Avengers, Start Wars, The Matrix..." />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
        <button onClick={() => navegate('moviesLiked')}>Ver Películas Guardadas</button>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}

export default Home
