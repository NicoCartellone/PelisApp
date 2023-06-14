import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MoviesLiekd from './components/MoviesLiekd'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/moviesLiked' element={<MoviesLiekd/>}/>
    </Routes>
  )
}

export default App
