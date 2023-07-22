import React from 'react'
import MainAppBar from './components/appbar/MainAppBar'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import HomePage from './pages/home/HomePage'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/about/AboutPage'
import BlogPage from './pages/blog/BlogPage'
import PageNotFound from './pages/page-not-found/PageNotFound'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FFFFFF',
        contrastText: '#263238',
      },
    },
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <MainAppBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
