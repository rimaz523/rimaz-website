import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button } from '@mui/material'

import BlogList from '../../components/blog-list/BlogList'
import Hero from '../../components/hero/Hero'
import SocialHandlesBand from '../../components/social-handles/SocialHandlesBand'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Hero />
      <SocialHandlesBand />
      <BlogList limit={4} />
      <Box textAlign='center' pt={{ xs: 2 }} pb={{ xs: 2 }}>
        <Button variant='contained' onClick={() => navigate('/blog')}>
          View more
        </Button>
      </Box>
    </>
  )
}

export default HomePage
