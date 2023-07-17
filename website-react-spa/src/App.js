import React from 'react'
import './App.css'
import MainAppBar from './components/appbar/MainAppBar'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

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
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
