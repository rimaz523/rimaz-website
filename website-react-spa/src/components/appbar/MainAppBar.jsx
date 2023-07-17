import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

export default function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Stack justifyContent='flex-end' sx={{ flexGrow: 1 }} spacing={0.5}>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1, mt: 2 }}>
              Rimaz Mohommed
            </Typography>
            <Typography variant='overline' display='block' gutterBottom>
              Full Stack Developer • Azure Specialist
            </Typography>
          </Stack>
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
