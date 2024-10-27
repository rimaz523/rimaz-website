import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'

import { Avatar, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BugReportIcon from '@mui/icons-material/BugReport'
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
  const isHomeRouteMatched = useMatch('/') !== null
  const isBlogRouteMatched = useMatch('/blog') !== null
  const isArticleRouteMatched = useMatch('/blog/:slug') !== null
  const isAboutRouteMatched = useMatch('/about') !== null
  const isContactRouteMatched = useMatch('/contact') !== null

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
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            mb={2}
            ml={1}
            sx={{
              flexGrow: 1,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                cursor: 'pointer',
              },
            }}
            onClick={() => navigate('/')}
          >
            <Avatar
              alt='Rimaz Mohommed'
              src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat('/about/profile.jpg')}
            />
            <Typography
              variant='h5'
              component='div'
              sx={{ flexGrow: 1 }}
              fontWeight='500'
              fontFamily='Roboto'
            >
              Rimaz Mohommed
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4, border: '1px solid' }} />

          <Box sx={{ mb: 2, width: { sm: 300 } }}>
            <ListItemButton onClick={() => routeToPage('/')} selected={isHomeRouteMatched}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'primary.light' }} />
              </ListItemIcon>
              <ListItemText
                primary='Home'
                primaryTypographyProps={{
                  fontWeight: 'bold',
                }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => routeToPage('/blog')}
              selected={isBlogRouteMatched || isArticleRouteMatched}
            >
              <ListItemIcon>
                <DescriptionIcon sx={{ color: 'primary.light' }} />
              </ListItemIcon>
              <ListItemText
                primary='Blog'
                primaryTypographyProps={{
                  fontWeight: 'bold',
                }}
              />
            </ListItemButton>
            <ListItemButton onClick={() => routeToPage('/about')} selected={isAboutRouteMatched}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'primary.light' }} />
              </ListItemIcon>
              <ListItemText
                primary='About'
                primaryTypographyProps={{
                  fontWeight: 'bold',
                }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => routeToPage('/contact')}
              selected={isContactRouteMatched}
            >
              <ListItemIcon>
                <EmailIcon sx={{ color: 'primary.light' }} />
              </ListItemIcon>
              <ListItemText
                primary='Contact'
                primaryTypographyProps={{
                  fontWeight: 'bold',
                }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() =>
                window.open(process.env.REACT_APP_SOCIAL_GITHUB_URL + '/rimaz-website/issues/new')
              }
            >
              <ListItemIcon>
                <BugReportIcon sx={{ color: 'primary.light' }} />
              </ListItemIcon>
              <ListItemText
                primary='Report an issue'
                primaryTypographyProps={{
                  fontWeight: 'bold',
                }}
              />
            </ListItemButton>
            {isDarkMode ? (
              <ListItemButton onClick={() => dispatch(setLightMode())}>
                <ListItemIcon>
                  <LightModeIcon sx={{ color: 'primary.light' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Light mode'
                  primaryTypographyProps={{
                    fontWeight: 'bold',
                  }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => dispatch(setDarkMode())}>
                <ListItemIcon>
                  <DarkModeIcon sx={{ color: 'primary.light' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Dark mode'
                  primaryTypographyProps={{
                    fontWeight: 'bold',
                  }}
                />
              </ListItemButton>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default MainMenu
