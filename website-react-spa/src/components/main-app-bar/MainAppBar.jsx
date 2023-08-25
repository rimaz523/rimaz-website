import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import Branding from '../branding/Branding'
import MainMenu from '../main-menu/MainMenu'

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
  })
}

export default function MainAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
        <AppBar color='secondary'>
          <Toolbar>
            <Branding title='Rimaz Mohommed' subtitle='Full Stack Developer • DevOps Engineer' />
            <MainMenu />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  )
}
