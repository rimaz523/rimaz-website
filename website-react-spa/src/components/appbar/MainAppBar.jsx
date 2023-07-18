import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Branding from '../branding/Branding'

export default function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Branding title='Rimaz Mohommed' subtitle='Full Stack Developer • Azure Specialist' />
          <List>
            <ListItem key='Blog' disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Blog' />
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
