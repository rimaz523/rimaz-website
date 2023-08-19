import React from 'react'

import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

import BlogList from '../../components/blog-list/BlogList'

const BlogPage = ({ content }) => {
  return (
    <>
      <Box textAlign='center' pt={{ xs: 4 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {content}
        </Typography>
      </Box>

      <BlogList />
    </>
  )
}

BlogPage.propTypes = {
  content: PropTypes.string,
}

BlogPage.defaultProps = {
  content: 'Venture into my realm of thoughts and musings!',
}

export default BlogPage
