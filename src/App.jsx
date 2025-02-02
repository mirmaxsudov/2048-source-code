import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { useDispatch } from 'react-redux'
import { setInitValues } from './features/2048/gameSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitValues());
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='game-over' element={<h1>Game Over</h1>} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App