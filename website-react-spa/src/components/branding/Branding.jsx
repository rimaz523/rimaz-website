import React from 'react'
import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Branding = ({ title, subtitle }) => (
  <Stack justifyContent='flex-end' sx={{ flexGrow: 1 }} spacing={0.5}>
    <Typography variant='h5' component='div' sx={{ flexGrow: 1, mt: 2 }}>
      {title}
    </Typography>
    <Typography variant='overline' display='block' gutterBottom>
      {subtitle}
    </Typography>
  </Stack>
)

Branding.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

Branding.defaultProps = {
  title: 'Rimaz Mohommed',
  subtitle: 'Full Stack Developer • Azure Specialist',
}

export default Branding
