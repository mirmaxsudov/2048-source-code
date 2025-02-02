import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './locale/en'
import { uz } from './locale/uz'
import { kr } from './locale/kr'
import { zh } from './locale/zh'
import { ru } from './locale/ru'

i18next.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    kr: { translation: kr },
    zh: { translation: zh },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: "uz",
  fallbackLng: "uz",
})

const App = () => {
  const handleChangeLanguage = e => i18next.changeLanguage(e.target.value)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage handleChangeLanguage={handleChangeLanguage} />} />
          <Route path='game-over' element={<h1>Game Over</h1>} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App