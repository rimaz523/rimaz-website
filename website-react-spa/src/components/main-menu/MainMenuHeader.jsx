import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Avatar, Stack, Typography } from '@mui/material'

const MainMenuHeader = ({ title, avatarUrl }) => {
  const navigate = useNavigate()

  return (
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
      <Avatar alt={title} src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat(avatarUrl)} />
      <Typography
        variant='h5'
        component='div'
        sx={{ flexGrow: 1 }}
        fontWeight='500'
        fontFamily='Roboto'
      >
        {title}
      </Typography>
    </Stack>
  )
}

MainMenuHeader.propTypes = {
  title: PropTypes.string,
  avatarUrl: PropTypes.string,
}

MainMenuHeader.defaultProps = {
  title: 'Rimaz Mohommed',
  avatarUrl: '/about/profile.jpg',
}

export default MainMenuHeader
