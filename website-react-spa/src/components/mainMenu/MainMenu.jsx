import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import DescriptionIcon from '@mui/icons-material/Description'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'

import { setLightMode, setDarkMode } from '../../features/theme/themeSlice'

const MainMenu = () => {
  const [open, setDrawerOpenState] = useState(false)
  const isDarkMode = useSelector((state) => state.theme.darkmode)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const routeToPage = (url) => {
    setDrawerOpenState(false)
    navigate(url)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpenState(open)
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
            <ListItemButton onClick={() => routeToPage('/')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
            <ListItemButton onClick={() => routeToPage('/blog')}>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
              </ListItemIcon>
              <ListItemText primary='Blog' />
            </ListItemButton>
            <ListItemButton onClick={() => routeToPage('/about')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItemButton>
            <ListItemButton onClick={() => routeToPage('/contact')}>
              <ListItemIcon>
                <EmailIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
              </ListItemIcon>
              <ListItemText primary='Contact' />
            </ListItemButton>
            {isDarkMode ? (
              <ListItemButton onClick={() => dispatch(setLightMode())}>
                <ListItemIcon>
                  <LightModeIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
                </ListItemIcon>
                <ListItemText primary='Light Mode' />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => dispatch(setDarkMode())}>
                <ListItemIcon>
                  <DarkModeIcon sx={{ color: isDarkMode ? 'primary.main' : '' }} />
                </ListItemIcon>
                <ListItemText primary='Dark Mode' />
              </ListItemButton>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default MainMenu
