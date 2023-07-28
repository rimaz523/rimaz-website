import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'mui-image'
import PropTypes from 'prop-types'

const Hero = ({ title, subtitle }) => {
  return (
    <Box position='relative' width='100%' height='400px'>
      <Image
        src='https://rimazdevappstore.blob.core.windows.net/app/hero-image.jpg'
        showLoading
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        position='absolute'
        top='50%'
        left='50%'
        textAlign='center'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='h6'>{subtitle}</Typography>
      </Box>
    </Box>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

Hero.defaultProps = {
  // prettier-ignore
  title: 'Hi, I\'m Rimaz.',
  subtitle: 'I am a full stack .NET developer specializing in Azure. Welcome to my blog!',
}

export default Hero
