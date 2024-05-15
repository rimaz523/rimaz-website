import React from 'react'

import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

import BlogList from '../../components/blog-list/BlogList'

const BlogPage = ({ content }) => {
  return (
    <>
      <Box textAlign='center' pt={{ xs: 15 }}>
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
  content: 'Insights from the Code Frontier',
}

export default BlogPage
