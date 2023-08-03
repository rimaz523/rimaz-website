import React from 'react'

import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const BlogPreview = () => {
  return (
    <Card variant='outlined' sx={{ m: 2 }}>
      <CardActionArea
        sx={{ m: 2 }}
        onClick={() => {
          window.open('https://rimazmohommed523.medium.com')
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <CardMedia
            component='img'
            sx={{
              xs: {
                height: 200,
              },
              sm: {
                height: 200,
              },
              md: {
                height: 140,
              },
            }}
            height='140'
            image={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat('/app/hero-light.jpg')}
            alt='green iguana'
          />
          <CardContent sx={{ m: 2 }}>
            <Typography gutterBottom variant='h6' component='div'>
              React 102 : Configuring code formatting using Prettier, ESLint & Husky
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              In this article I’ll be diving into setting up pettier, eslint and husky for
              configuting the code formatting rules for your react js application. I will be using
              yarn as my package manager.
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

export default BlogPreview
