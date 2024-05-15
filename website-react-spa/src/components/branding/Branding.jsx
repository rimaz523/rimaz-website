import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Branding = ({ title, subtitle }) => {
  const navigate = useNavigate()

  return (
    <Stack
      justifyContent='flex-end'
      sx={{
        flexGrow: 1,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate('/')}
    >
      <Typography variant='h5' component='div' sx={{ flexGrow: 1, mt: 1 }}>
        {title}
      </Typography>
      <Typography variant='overline' display='block' gutterBottom>
        {subtitle}
      </Typography>
    </Stack>
  )
}

Branding.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

Branding.defaultProps = {
  title: 'Rimaz Mohommed',
  subtitle: 'Full Stack Developer • Azure Specialist',
}

export default Branding
