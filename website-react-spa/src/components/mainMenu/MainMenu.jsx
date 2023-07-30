import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DescriptionIcon from '@mui/icons-material/Description'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import EmailIcon from '@mui/icons-material/Email'

const MainMenu = () => {
  const [open, setState] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState(open)
  }
  return (
    <>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            p: 2,
            h: 1,
          }}
        >
          <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2, width: { sm: 300 } }}>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Blog' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Contact' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LightModeIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Light Mode' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DarkModeIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Dark Mode' />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default MainMenu
