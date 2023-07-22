import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'mui-image'

const Hero = () => {
  return (
    <Box position='relative' width='100%' height='400px'>
      <Image
        src='hero-image.jpg'
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
        <Typography variant='h4'>Hi, I&apos;m Rimaz.</Typography>
        <Typography variant='h6'>
          I am a full stack .NET developer specializing in Azure. Welcome to my blog!
        </Typography>
      </Box>
    </Box>
  )
}

export default Hero
