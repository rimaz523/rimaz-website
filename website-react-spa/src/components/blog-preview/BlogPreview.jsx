import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const BlogPreview = ({ title, publishedDate, content, image, url, slug }) => {
  const publishedDateObj = new Date(publishedDate)
  const navigate = useNavigate()
  // Format the date
  const formattedDate = publishedDateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  return (
    <Card variant='outlined' sx={{ m: 2, borderRadius: '10px', height: '100%' }}>
      <CardActionArea
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          height: '100%',
        }}
        onClick={() => {
          slug ? navigate('/blog/' + slug) : window.open(url)
        }}
      >
        <Stack direction='column' sx={{ height: '100%' }}>
          <CardMedia
            component='img'
            height='140'
            image={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat(image)}
            alt='green iguana'
          />
          <CardContent sx={{ mt: 0 }}>
            <Typography gutterBottom variant='h6' component='div'>
              {title}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary' sx={{ pb: 2 }} gutterBottom>
              Published on {formattedDate}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {content}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

BlogPreview.propTypes = {
  title: PropTypes.string,
  publishedDate: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string,
}

BlogPreview.defaultProps = {
  title: 'AZ-303 Azure Architect Technologies : Study Guide',
  content:
    'I passed my AZ-303 exam in June 2021. The exam consisted of around MCQs and 1 case study. What follows is the study guide I created based on the exam skills outline to help me prepare. Hope this helps you too. Cheers!',
  image: '/app/hero-light.jpg',
  url: 'https://rimazmohommed523.medium.com/az-303-azure-architect-technologies-study-guide-e0bb6e3e2ee4',
}

export default BlogPreview
