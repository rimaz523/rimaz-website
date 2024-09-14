import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'

import Footer from './components/footer/Footer'
import MainAppBar from './components/main-app-bar/MainAppBar'
import AboutPage from './pages/about/AboutPage'
import ArticlePage from './pages/article/ArticlePage'
import BlogPage from './pages/blog/BlogPage'
import ContactPage from './pages/contact/ContactPage'
import HomePage from './pages/home/HomePage'
import PageNotFound from './pages/page-not-found/PageNotFound'
import darkTheme from './themes/DarkTheme'
import lightTheme from './themes/LightTheme'

function App() {
  const isDarkMode = useSelector((state) => state.theme.darkmode)
  const theme = isDarkMode ? createTheme(darkTheme) : createTheme(lightTheme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <MainAppBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/:slug' element={<ArticlePage />} />
          <Route path='/contact' element={<ContactPage />} />
          {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          <Route path='/page-not-found' element={<PageNotFound />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
