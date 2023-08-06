import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import Branding from '../branding/Branding'
import MainMenu from '../main-menu/MainMenu'

export default function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Branding title='Rimaz Mohommed' subtitle='Full Stack Developer • DevOps Engineer' />
          <MainMenu />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
